import firebase, {firebaseApi,storageRef} from '../firebase.js'
import { v4 as uuidv4 } from 'uuid';



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
                createdAt:firebase.firestore.FieldValue.serverTimestamp()
            })

            return "added successfully"

        }
        catch(err){
            throw err
        }

    },
    read:async()=>{
        try{

        }
        catch(err){
            throw err
        }

    },
    update:async()=>{
        try{

        }
        catch(err){
            throw err
        }

    },
    delete:async()=>{
        try{

        }
        catch(err){
            throw err
        }

    }
}

export default articles