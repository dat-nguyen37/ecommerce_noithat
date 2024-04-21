const productController=require('../controller/product')

async function categoryRouter(fastify){
    fastify.post('/product/create',productController.create)
    fastify.put('/product/update/:id',productController.update)
    fastify.delete('/product/delete/:id',productController.delete)
    fastify.get('/product/find/:id',productController.findProduct)
    fastify.get('/product/category/:id',productController.findByCategoryId)
    fastify.get('/product/getAll',productController.getAll)
    fastify.get('/product/:id',productController.findById)
    fastify.get('/product/search',productController.search)
    fastify.get('/product/getProductByCategory',productController.getProductByCategory)
    fastify.get('/product/new',productController.findProductNew)





}
module.exports=categoryRouter