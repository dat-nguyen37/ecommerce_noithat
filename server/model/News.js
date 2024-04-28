const { default: mongoose } = require("mongoose");

const newsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    content:{
        type:String,
    },
    image:{
        type:[String]
    }
},
{timestamps:true}
)
module.exports=mongoose.model('new',newsSchema)