const User=require('../model/User')
const bcrypt=require('bcrypt')

exports.getAll=async(req,reply)=>{
    try {
        const users=await User.find()
        reply.code(200).send(users)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getById=async(req,reply)=>{
    try {
        const users=await User.find({_id:req.params.id})
        reply.code(200).send(users)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getUpdate=async(req,reply)=>{
    try {
        const updateUser=req.body
        if(updateUser.password){
            const hashPassword=await bcrypt.hash(updateUser.password,10)
            updateUser.password=hashPassword
        }
        const user=await User.findByIdAndUpdate(req.params.id,{
            ...updateUser
        },{new:true})
        reply.code(200).send(user)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getDelete=async(req,reply)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        reply.code(200).send('Delete successfull')
    } catch (err) {
        reply.code(500).send(err)
    }
}