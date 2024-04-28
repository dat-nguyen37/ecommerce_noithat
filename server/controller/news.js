const News=require('../model/News')


exports.create=async(req,reply)=>{
    try {
        const newNews=new News(req.body)
        const news=await newNews.save()
        reply.code(200).send(news)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getAll=async(req,reply)=>{
    try {
        const news=await News.find().sort({createdAt:-1})
        reply.code(200).send(news)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getById=async(req,reply)=>{
    try {
        const news=await News.findById(req.params.id)
        reply.code(200).send(news)
    } catch (err) {
        reply.code(500).send(err)
    }
}