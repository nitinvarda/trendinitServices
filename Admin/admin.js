import {auth} from '../firebase.js'



const admin ={
    login:async(email,password)=>{
        try{
            const signInAdmin = await auth().signInWithEmailAndPassword(email,password)
            const result = signInAdmin.user
           

            return{
                uid:result.uid,
                username:result.displayName,
                email:result.email
            }

        }
        catch(err){
            throw err
        }
    },
    register:async(email,password,username)=>{
        try{
            const createAdmin = await auth().createUserWithEmailAndPassword(email,password)
            const result = createAdmin.user

            result.updateProfile({
                displayName:username
            })
            
            
            // const addToCollection = await firebaseApi.users.add({
            //     username,
            //     userId:result.uid
            // })

            return {
                uid:result.uid,
                username:username,
                email:result.email
            }
        }
        catch(err){
            throw err
        }
    }
}

export default admin