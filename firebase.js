import firebase from 'firebase'
import '@firebase/storage'
import {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID
} from 'dotenv'



const getFirebaseConfig = () =>{


if(!process.env.REACT_APP_API_KEY){
    
        const config = {
            apiKey:REACT_APP_API_KEY,
            authDomain:REACT_APP_AUTH_DOMAIN,
            projectId:REACT_APP_PROJECT_ID,
            storageBucket:REACT_APP_STORAGE_BUCKET,
            messagingSenderId:REACT_APP_MESSAGING_SENDER_ID,
            appId:REACT_APP_APP_ID,
            
        }
        return config
  
   


}
else{
    const config = {
        apiKey:process.env.REACT_APP_API_KEY,
        authDomain:process.env.REACT_APP_AUTH_DOMAIN,
        projectId:process.env.REACT_APP_PROJECT_ID,
        storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId:process.env.REACT_APP_APP_ID

    }
    return config
}

}


const firebaseConfig = getFirebaseConfig()
firebase.initializeApp(firebaseConfig);



const firestore = firebase.firestore()
console.log(firebase.auth())
const storageRef = firebase.storage().ref()
const auth =()=> firebase.auth()




const firebaseApi = {
    articles:firestore.collection('articles'),
    users:firestore.collection('users')

}

export default firebase
export {firebaseApi,storageRef,auth}