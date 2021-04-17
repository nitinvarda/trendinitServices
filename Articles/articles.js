import firebase, {firebaseApi,storageRef} from '../firebase.js'
import { v4 as uuidv4 } from 'uuid';




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
            const uploadImage = await articleImage.put(details.articleImage)

            const imageUrl = await storageRef.child(`images/${details.articleImage.name}`).getDownloadURL()
            const createArticle = await firebaseApi.articles.add({
                title:details.title,
                by: details.by,
                desc:details.desc,
                category: details.category,
                image:imageUrl,
                createdAt:new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            })

            return "added successfully"

        }
        catch(err){
            throw {message:err}
        }

    },
    read:async()=>{
        try{
            var user = firebase.auth().currentUser;
            console.log(user)
            const getArticles = await firebaseApi.articles.get()
            const articles = getArticles.docs.map(doc=>({id:doc.id,...doc.data()}))
            return articles

        }
        catch(err){
            throw {message:err}
        }

    },
    update:async()=>{
        try{

        }
        catch(err){
            throw {message:err}
        }

    },
    delete:async()=>{
        try{

        }
        catch(err){
            throw {message:err}
        }

    },
    getById:async(id)=>{
        try{
            const getArticles = await firebaseApi.articles.doc(id).get()
            // const getArticleById = getArticles.docs.filter(doc=>doc.id === id)
            return {id:getArticles.id,...getArticles.data()}

        }
        catch(err){
            throw {message:err}
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
        catch(err){
            throw {message:err}

        }
    }
}

export default articles