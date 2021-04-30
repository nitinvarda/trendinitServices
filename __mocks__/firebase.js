module.exports={
    initializeApp:()=> true,
    firestore:()=>{
        return({
            collection:(name)=>{
                return{
                    orderBy:(value,type)=>{
                        return({
                            get:()=>({id:'ioqwGIUGHpdfdf',name:'dummy ari'})
                        })
                    }
                }
            }
        })
    },
    storage:()=>{
        return ({ref:()=>true})
    },
    auth:()=>{
        return({
            signInWithEmailAndPassword:(email,password)=>{
                return {uid:"adgadrfhaedg",
                    username:"janedoe",
                    email:email}
            },
            createUserWithEmailAndPassword:(email,password)=>{
                return {
                    displayName:'jane'
                }
            },
            currentUser:{
                uid:"adgadrfhaedg",
                username:"janedoe",
                email:'janedoe@gmail.com'
            }
        })
    }
   
}