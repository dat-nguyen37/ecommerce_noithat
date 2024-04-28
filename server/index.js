const fastify=require('fastify')({longger:true})
const path=require('path')
const connect =require('./config/db')
const fs= require('fs')

require('dotenv').config()
fastify.register(require('@fastify/cookie'))
require('./controller/passport')
const fastifySession=require('@fastify/secure-session')
fastify.register(require('@fastify/cors'), {
    origin: 'http://localhost:8080',
    credentials: true 
  })
fastify.register(fastifySession,{
    key:fs.readFileSync(path.join(__dirname,"not-so-secret-key")),
    cookie:{
      path:'/'
    },
    cookieName:'accessCookie'
  })

const fastifyPassport=require('@fastify/passport')
fastify.register(fastifyPassport.initialize())
fastify.register(fastifyPassport.secureSession())

fastify.register(require('./router/auth'))
fastify.register(require('./router/user'))
fastify.register(require('./router/product'))
fastify.register(require('./router/category'))
fastify.register(require('./router/cart'))
fastify.register(require('./router/order'))
fastify.register(require('./router/payment'))
fastify.register(require('./router/news'))
fastify.register(require('./router/comment'))







const start=async()=>{
    try {
        await fastify.listen(5000)
        console.log('Srever is running on port 5000')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
start()
connect()




