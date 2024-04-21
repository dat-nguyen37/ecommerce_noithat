const orderController=require('../controller/order')
const checkLogin=require('../verifyToken')

async function orderRouter(fastify){
    fastify.post('/order/create',{preHandler:checkLogin},orderController.creatOrder)
    fastify.get('/order/getByUser',{preHandler:checkLogin},orderController.orderByUser)
    fastify.delete('/order/delete/:id',{preHandler:checkLogin},orderController.deleteOrder)
    fastify.get('/order/all',{preHandler:checkLogin},orderController.orderAll)
    fastify.put('/order/update/:id',{preHandler:checkLogin},orderController.UpdateOrder)
    fastify.get('/order/totalByMonth',{preHandler:checkLogin},orderController.totalByMonth)
    fastify.get('/order/selling',orderController.selling)


}

module.exports=orderRouter