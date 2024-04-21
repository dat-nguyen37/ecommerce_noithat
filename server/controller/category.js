const Category=require('../model/Category')


exports.create=async(req,reply)=>{
    try {
        const newCategory=new Category(req.body)
        const result=await newCategory.save()
        reply.code(200).send(result)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.update=async(req,reply)=>{
    try {
        const result=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        reply.code(200).send(result)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.delete=async(req,reply)=>{
    try {
        const result=await Category.findByIdAndDelete(req.params.id,{new:true})
        reply.code(200).send("delete successfull")
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getAll=async(req,reply)=>{
    try {
        const {page,limit}=req.query
        const Page = page ? parseInt(page) : 1;
        const Limit= limit ? limit :5 
        const skip = (Page - 1) * Limit; 
        const result=await Category.find().skip(skip).limit(Limit)
        reply.code(200).send(result)
    } catch (err) {
        reply.code(500).send(err)
    }
}