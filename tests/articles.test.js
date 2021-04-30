import articles from '../Articles/articles'

describe('testing articles module',()=>{

    test('articles read test',async()=>{
        try{

           await expect(articles.read()).toBe({id:'ioqwGIUGHpdfdf',name:'dummy ari'})
        }
        catch(err){

        }

    })
})