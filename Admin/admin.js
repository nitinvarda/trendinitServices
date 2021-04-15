import firebase,{firebaseApi} from '../firebase.js'



const admin ={
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
    register:async(email,password,username)=>{
        try{
            const createAdmin = await firebase.auth().createUserWithEmailAndPassword(email,password)
            const result = createAdmin.user

            const addToCollection = await firebaseApi.users.add({
                username
            })

            return result
        }
        catch(err){
            throw err
        }
    }
}

export default admin