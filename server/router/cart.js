const cartController=require('../controller/cart')
const checkLogin=require('../verifyToken')

async function cartRouter(fastify,_,done){
    fastify.post('/cart/create',{preHandler:checkLogin},cartController.create)
    fastify.get('/cart/find',{preHandler:checkLogin},cartController.cartByUser)
    fastify.put('/cart/update/:id',{preHandler:checkLogin},cartController.update)
    fastify.delete('/cart/delete/:id',{preHandler:checkLogin},cartController.delete)

    done()
}
module.exports=cartRouter