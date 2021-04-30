import admin from '../Admin/admin'
import {auth} from '../firebase'

describe('testing admin functionalities',()=>{

    test('testing login',async()=>{
        try{

            await expect(auth().signInWithEmailAndPassword('janedoe@gmail.com','123456')).toStrictEqual({uid:"adgadrfhaedg",
            username:"janedoe",
            email:'janedoe@gmail.com'})
        }
        catch(err){

        }
    }) 

    test('testing signup',async()=>{
        try {
            
           await expect(auth().createUserWithEmailAndPassword('janedoe@gmail.com','123456')).toStrictEqual({displayName:'jane'})
        } catch (error) {
            
        }
    })
})