const newController=require('../controller/news')


async function newRouter(fastify,_,done){
    fastify.post('/news/create',newController.create)
    fastify.get('/news/all',newController.getAll)
    fastify.get('/news/:id',newController.getById)




    done()
}
module.exports=newRouter