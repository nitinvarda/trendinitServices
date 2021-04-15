import firebase,{firebaseApi} from '../firebase.js'



export const admin ={
    login:async(email,password)=>{
        try{
            const signInAdmin = await firebase.auth().signInWithEmailAndPassword(email,password)
            const result = signInAdmin.user
            return result

        }
        catch(err){
            throw err
        }
    },
    register:async(email,password)=>{
        try{
            const createAdmin = await firebase.auth().createUserWithEmailAndPassword(email,password)
            const result = createAdmin.user
            return result
        }
        catch(err){
            throw err
        }
    }
}