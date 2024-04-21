const Product=require('../model/Product')
const Category=require('../model/Category')



exports.create=async(req,reply)=>{
    try {
        const newProduct=new Product(req.body)
        const result=await newProduct.save()
        reply.code(200).send(result)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.update=async(req,reply)=>{
    try {
        const result=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        reply.code(200).send(result)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.delete=async(req,reply)=>{
    try {
        const result=await Product.findByIdAndDelete(req.params.id,{new:true})
        reply.code(200).send("delete successfull")
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.findProduct=async(req,reply)=>{
    try {
        const {min,max,sort,page,limit}=req.query
        const Page = page ? parseInt(page) : 1;
        const Limit= limit ? limit :8 
        const skip = (Page - 1) * Limit; 
        const category=await Category.findById(req.params.id)
        const product=await Product.find({
            categoryId:req.params.id,price:{$gt: min |1,$lt: max || 100000000}
        })
        .sort({price:sort==="desc" ? -1 :1})
        .sort({createdAt:sort==='new' ? -1 : 1}).skip(skip).limit(Limit)
        reply.code(200).send({categoryName:category.name,product})
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getById=async(req,reply)=>{
    try {
        const result=await Product.findById(req.params.id)
        reply.code(200).send(result)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.search=async(req,reply)=>{
    try {
        const q=req.query.q
        const result=await Product.find({name:{ $regex: q, $options: 'i' }})
        reply.code(200).send(result)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.findByCategoryId=async(req,reply)=>{
    try {
        const result=await Product.find({categoryId:req.params.id})
        reply.code(200).send(result)
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
        const products=await Product.find().skip(skip).limit(Limit);
        const data=[]
        for (const product of products) {
            const category = await Category.findById(product.categoryId);
            
            data.push({id:product._id,categoryName:category.name,name:product.name,price:product.price,image:product.image,description:product.description})
        }
        reply.code(200).send(data)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.findById=async(req,reply)=>{
    try {
        const product=await Product.findById(req.params.id)
        const data=[]
        const category = await Category.findById(product.categoryId);
        data.push({id:product._id,categoryId:product.categoryId,categoryName:category.name,name:product.name,price:product.price,image:product.image,description:product.description})
        reply.code(200).send(data)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.getProductByCategory=async(req,reply)=>{
    try {
        const categorys=await Category.find().limit(8);
        const data=[]
        for (const category of categorys) {
            const product = await Product.find({categoryId:category._id});
            
            data.push({categoryName:category.name,product})
        }
        reply.code(200).send(data)
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.findProductNew=async(req,reply)=>{
    try {
        const product=await Product.find().sort({createdAt:-1}).limit(4)
        reply.code(200).send(product)
    } catch (err) {
        reply.code(500).send(err)
    }
}