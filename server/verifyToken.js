const jwt=require('jsonwebtoken')

const checkLogin=async(req,reply)=>{
    const token=req.cookies.accessCookie;
    if(!token) return reply.code(401).send('You are not Authenticated')
    try {
        decode=jwt.verify(token,process.env.SECRET)
        req.user=decode.id,
        req.admin=decode.admin
    } catch (error) {
        return reply.code(401).send('Valid Token')
    }
}

module.exports=checkLogin