const categoryController=require('../controller/category')

async function categoryRouter(fastify){
    fastify.post('/category/create',categoryController.create)
    fastify.put('/category/update/:id',categoryController.update)
    fastify.delete('/category/delete/:id',categoryController.delete)
    fastify.get('/category/getAll',categoryController.getAll)
    

}
module.exports=categoryRouter