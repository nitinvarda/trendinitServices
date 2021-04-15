import firebase,{firebaseApi} from '../firebase.js'



const admin ={
    login:async(email,password)=>{
        try{
            const signInAdmin = await firebase.auth().signInWithEmailAndPassword(email,password)
            const result = signInAdmin.user
            const getUserDetails = await firebaseApi.users.where("userId","==",`${result.uid}`).get()
            const userDetails = getUserDetails.docs.map(doc=>doc.data())

            return userDetails[0]

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
                username,
                userId:result.uid
            })

            return result
        }
        catch(err){
            throw err
        }
    }
}

export default admin