import firebase, {firebaseApi,storageRef} from '../firebase.js'





const searchFilter = {
    ascending: (value, startAt) => ascending(value, startAt),
    descending: (value, startAt) => descending(value, startAt),
}

const ascending = (value, startAt = 0) => {
    return `.orderBy("${value}").startAt(${startAt})`
}

const descending = (value, startAt = 0) => {
    return `.orderBy("${value}", "desc")`
}

const articles = {
    create:async(details)=>{
        try{
            const articleImage = storageRef.child(`images/${details.articleImage.name}`)
            await articleImage.put(details.articleImage)

            const imageUrl = await storageRef.child(`images/${details.articleImage.name}`).getDownloadURL()
            const currentUser = await firebase.auth().currentUser
            const timeStamp = firebase.firestore.FieldValue.serverTimestamp
            await firebaseApi.articles.add({
                title:details.title,
                by: currentUser.displayName,
                desc:details.desc,
                category: details.category,
                image:imageUrl,
                imageName:details.articleImage.name,
                createdAt:timeStamp()
                // createdAt:new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            })

            return "added successfully"

        }
        catch(err){
            const errorMessage = err.message
            throw errorMessage
        }

    },
    read:async()=>{
        try{
            var user = firebase.auth().currentUser;
            console.log(user)
            const getArticles = await firebaseApi.articles.orderBy("createdAt","desc").get()
            const articles = getArticles.docs.map(doc=>({id:doc.id,...doc.data()}))
            return articles

        }
        catch(err){
            const errorMessage = err.message
            throw errorMessage
        }

    },
    update:async()=>{
        try{

        }
        catch(err){
            const errorMessage = err.message
            throw errorMessage
        }

    },
    delete:async(id,imageName)=>{
        try{
            await storageRef.child(`images/${imageName}`).delete()
            await firebaseApi.articles.doc(id).delete()
            return 'deleted'

        }
        catch(err){
            const errorMessage = err.message
            throw errorMessage
        }

    },
    getById:async(id,imageName)=>{
        try{
            const getArticles = await firebaseApi.articles.doc(id).get()
            // const getArticleById = getArticles.docs.filter(doc=>doc.id === id)
            return {id:getArticles.id,...getArticles.data()}

        }
        catch(err){
            const errorMessage = err.message
            throw errorMessage
        }
    },
    search:async(options)=>{
        try{
            let queryString = 'firebaseApi.articles'
            options.keyword && options.keyword.map(async (key) => {
                queryString += `.where("${key[0]}", "${key[1]}", "${key[2]}")`
            })
            if (options.order) {

                const orderBy = searchFilter[options.order](options.orderBy, options.startAt)
                console.log(orderBy)
                queryString += orderBy || `.orderBy("recipe.name")`
            }

            queryString += options.limit ? `.limit(${options.limit})` : `.limit(12)`
            queryString += ".get()"

            console.log(queryString)
            // eslint-disable-next-line no-new-func 
            const result = new Function("firebaseApi", `return ${queryString} `)
            const collectionData = await result(firebaseApi)
            const map = collectionData.docs.map(doc => {
                const id = doc.id
                return { id, ...doc.data() }
            })
            console.log(map)
            return map
        }
        catch(err){
            const errorMessage = err.message
            throw errorMessage

        }
    }
}

export default articles