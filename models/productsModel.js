const mongoose = require("../config/mongodb")

const productsSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo es obligatorio"],
        minLength:3
    },
    price:Number,
    description:String,
    quantity:Number,
    status:String,
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    },
    destacado: Boolean
})


productsSchema.set("toJSON",{getters:true,setters:true,virtuals:true})

module.exports = mongoose.model("productos",productsSchema)