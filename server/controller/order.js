const Order =require('../model/Order')
const Cart=require('../model/Cart')
const Product=require('../model/Product')

exports.creatOrder=async(req,reply)=>{
    try {
        if(req.user){
            const newOrder=new Order({
                userId:req.user,
                product:req.body.product,
                price:req.body.price,
                paymentStatus:req.body.paymentStatus,
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                city:req.body.city,
                ward:req.body.ward,
                district:req.body.district,
                shipping:req.body.shipping,
                description:req.body.description
            })
            const order=await newOrder.save()
            const cartItems=req.body.product.map(item=>item.productId)
            await Cart.deleteMany({userId:req.user,productId:{$in:cartItems}})
            reply.code(200).send(order)
        }else{
            reply.code(401).send("Authentication")    
        }
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.orderAll=async(req,reply)=>{
    try {
        const {page,limit}=req.query
        const Page = page ? parseInt(page) : 1;
        const Limit= limit ? limit :5 
        const skip = (Page - 1) * Limit; 
        if(req.admin){
            const order=await Order.find().sort({createdAt: -1}).skip(skip).limit(Limit)
            reply.code(200).send(order)
        }else{
            reply.code(401).send("Authentication")    
        }
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.totalByMonth = async (req, reply) => {
    try {
        const results = await Order.aggregate([
            {
                $match: { paymentStatus: 'Đã thanh toán' }
            },
            {
                $project: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    price: 1
                }
            },
            {
                $group: {
                    _id: '$month',
                    totalRevenue: { $sum: '$price' },
                }
            },
            {
                $group: {
                    _id: null,
                    monthlyRevenue: { $push: '$$ROOT' },
                    total: { $sum: '$totalRevenue' } // Tính tổng tổng cộng của tất cả các khoản doanh thu từ tất cả các tháng
                }
            },
            {
                $sort: { _id: 1 ,}
            }
        ]);

        reply.code(200).send(results);
    } catch (err) {
        reply.code(500).send(err);
    }
};

exports.orderByUser=async(req,reply)=>{
    try {
        if(req.user){
            const order=await Order.find({userId:req.user})
            reply.code(200).send(order)
        }else{
            reply.code(401).send("Authentication")    
        }
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.deleteOrder=async(req,reply)=>{
    try {
        if(req.user){
            const order=await Order.findByIdAndDelete(req.params.id)
            reply.code(200).send('delete success')
        }else{
            reply.code(401).send("Authentication")    
        }
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.UpdateOrder=async(req,reply)=>{
    try {
        if(req.admin){
            const order=await Order.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
            reply.code(200).send('update success')
        }else{
            reply.code(403).send("Forbiden")    
        }
    } catch (err) {
        reply.code(500).send(err)
    }
}
exports.selling = async (req, reply) => {
    try {
        const results = await Order.aggregate([
            {
                $match: { paymentStatus: "Đã thanh toán" }
            },
            {
                $unwind: "$product"
            },
            {
                $group: {
                    _id: "$product.productId",
                    totalQuantity: { $sum: "$product.quantity" }
                }
            },
            // Sắp xếp các sản phẩm theo tổng số lượng giảm dần
            {
                $sort: { totalQuantity: -1 }
            },
            // Lấy ra 5 sản phẩm đầu tiên
            {
                $limit: 4
            },
        ]);
        const products=await Promise.all(results.map(p=>{
            return Product.findById(p._id)
        }))
        reply.code(200).send(products);
    } catch (err) {
        reply.code(500).send(err);
    }
};
