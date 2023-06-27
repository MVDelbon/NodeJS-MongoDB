const productosModel = require("../models/productsModel")

module.exports = {
    getAll: async function(req, res, next) {
        try{
            const documents = await productosModel.find().populate("category").select("name price").sort({price:-1})
            res.status(200).json(documents)
        }catch(e){
            console.log(e)
            res.status(400).json({message:e.message})
        }
    },

    getDestacados: async function(req, res, next) {
        try{
            const documents = await productosModel.find({destacado:true}).populate("category").select("name price").sort({price:-1})
            res.status(200).json(documents)
        }catch(e){
            console.log(e)
            res.status(400).json({message:e.message})
        }
    },

    getById: async function(req, res, next) {
        try{
            const document = await productosModel.findById(req.params.id)
            res.status(200).json(document)
        }catch(e){
            next(e)
        }
    },
    create: async function(req, res, next) {
        try{
            console.log(req.body)
            const document = new productosModel({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                category:   req.body.category,
                destacado: req.body.destacado || false
            })
            const product = await document.save()
            res.status(201).json(product)
        }catch(e){
            console.log(e)
            e.status=400
            next(e)
        }
        
    },
    update: async function(req, res, next) {
        try{
            const update = await productosModel.updateOne({_id:req.params.id},req.body)
            res.status(200).json(update)
        }catch(e){
            next(e)
        }
    },
    delete: async function(req, res, next) {
        try{
            const deleteResponse = await productosModel.deleteOne({_id:req.params.id})
            res.status(200).json(deleteResponse)
        }catch(e){
            next(e)
        }
    }
}