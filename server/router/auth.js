const AuthController=require("../controller/auth")


async function authRouter(fastify){
    fastify.post('/api/register',AuthController.register)
    fastify.post('/api/signin',AuthController.signin)
    fastify.get('/api/logout',AuthController.logout)

}
module.exports=authRouter