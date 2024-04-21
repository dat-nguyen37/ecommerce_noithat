const UserController=require("../controller/user")
const checkLogin=require('../verifyToken')
const fastifyPassport=require('@fastify/passport')
const User =require('../model/User')
const CLIENT_URL="http://localhost:8080"
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

async function userRouter(fastify){
    fastify.get('/api/getAll',UserController.getAll)
    fastify.get('/api/getById/:id',UserController.getById)
    fastify.put('/api/update/:id',UserController.getUpdate)
    fastify.delete('/api/delete/:id',UserController.getDelete)
    // google
    fastify.get("/login/success",async(req,reply)=>{
        try {
         const user=await User.findOne({email:req.user.email})
         const token=jwt.sign({id:user._id,admin:user.admin},process.env.SECRET)
         reply
         .setCookie("accessCookie",token, {path:'/',httpOnly:true})
         .code(200)
         .send(user)
        } catch (err) {
          reply.send(err)
        }
     })
     fastify.get("/auth/google",fastifyPassport.authenticate("google", {scope:["email","profile"]}))
     fastify.get("/auth/google/callback",fastifyPassport.authenticate("google", { 
       failureRedirect: `${CLIENT_URL}/login`,
       successRedirect: CLIENT_URL
   }));
   // github
   fastify.get("/auth/github",fastifyPassport.authenticate("github", {scope:["email","profile"]}))
   fastify.get("/auth/github/callback", fastifyPassport.authenticate("github",{
     failureRedirect: `${CLIENT_URL}/login`,
     successRedirect: CLIENT_URL
   }))

}
module.exports=userRouter