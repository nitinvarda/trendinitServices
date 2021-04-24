import {firebaseApi} from '../firebase.js'





export const CRUDoperations = {
    create: async (collectionName, value) => {
        
        try {
            const addingToFirestore = await firebaseApi[collectionName].add(value)

            return 'Added successfully'

        }
        catch (err) {
            throw err

        }

    },
    read: async (collectionName) => {
        try {
            const gettingData = await firebaseApi[collectionName].get()
            // const data = gettingData.docs.map(doc => doc.data())
            // const data = gettingData.docs.filter(doc => doc.data().name == 'RandomTest')
            // console.log(data)
            // return { id: data[0].id, data: data[0].data() }
            const data = gettingData.docs.map(doc => {
                const id = doc.id

                return { id, ...doc.data() }
            })
            return data
        }
        catch (err) {
            throw err

        }

    },
    update: async (collectionName, docId, updatedData) => {
        // updatedData format 
        // {name:'',description:'',type:'',unit:''}
        try {
            const updating = await firebaseApi[collectionName].doc(docId).update(updatedData)
            return "Updated Successfully"


        }
        catch (err) {
            throw err
        }

    },
    delete: async (collectionName, docId) => {
        try {
            const deleting = await firebaseApi[collectionName].doc(docId).delete()
            return "Deleted Successfully"

        }
        catch (err) {
            throw err

        }

    },
    search: async (collectionName, options) => {
        try {

            let queryString = `firebaseApi["${collectionName}"]`
            options.keyword && options.keyword.map(async (key) => {
                queryString += `.where("${key[0]}", "${key[1]}", "${key[2]}")`
            })
            if (options.order) {

                const orderBy = searchFilter[options.order](options.orderBy, options.startAt)
                console.log(orderBy)
                queryString += orderBy || `.orderBy("recipe.name")`
            }

            queryString += options.limit ? `.limit(${options.limit})` : `.limit(15)`
            queryString += ".get()"

            console.log(queryString)
            const result = new Function("firebaseApi", `return ${queryString} `)
            const collectionData = await result(firebaseApi)
            const map = collectionData.docs.map(doc => {
                const id = doc.id
                return { id, ...doc.data() }
            })
            console.log(map)
            return map

        }
        catch (err) {
            console.log(err)

        }
    }


}