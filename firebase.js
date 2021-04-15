import firebase from 'firebase'
import '@firebase/storage'
import dotenv from 'dotenv'

dotenv.config()

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId:process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};






// const firebaseConfig = {
//     apiKey: "AIzaSyAKVceYDmJUot1sh0wPeqeHS47vOTSYuYI",
//     authDomain: "trendinit-28f34.firebaseapp.com",
//     projectId: "trendinit-28f34",
//     storageBucket: "trendinit-28f34.appspot.com",
//     messagingSenderId: "978489005268",
//     appId: "1:978489005268:web:472070eef2accee7619741"
// };



firebase.initializeApp(firebaseConfig);



const firestore = firebase.firestore()
const storageRef = firebase.storage().ref()



const firebaseApi = {
    articles:firestore.collection('articles'),
    users:firestore.collection('users')

}

export default firebase
export {firebaseApi,storageRef}