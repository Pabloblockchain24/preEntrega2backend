const {Router} = require("express")
const router = Router()
const { default: mongoose } = require("mongoose")

const {productModel} = require("../models/product.model.js")


// router.get("/", async(req,res) => {
//     await mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")
//     let productos = await productModel.aggregate()
//     try{
//         res.send({status: "success", payload: productos})
//     }catch(error){
//         console.log(error)
//     }
// })


// router.get("/:pid", async(req,res) => {

//     try{
//         let products = await productModel.find()
//         res.send({result: "success", payload: products})
//     }catch(error){
//         console.log(error)
//     }
// })


router.post("/", async(req,res)=>{

    let {nombre, descripcion, categoria, precio} = req.body
    try{
        if(!nombre || !descripcion || !categoria || !precio){
            res.send({status:"error", error:"faltan datos"})
        }
        let result = await productModel.create({nombre, descripcion, categoria, precio})
        res.send({result: "success", payload: result })
    }catch(error){
        console.log(error)
    }
})

// router.put("/:pid", async(req,res)=>{
//     let {pid} =  req.params
//     let productToReplace = req.body
//     if(!productToReplace.nombre || !productToReplace.descripcion || !productToReplace.precio || !productToReplace.categoria){
//         res.send({status: "error", error:"no hay datos en parametros"})
//     }
//     let result = await productModel.updateOne({_id: pid}, productToReplace)
//     res.send({result: "success", payload: result })
// })

router.delete("/:pid", async(req,res)=>{
    let {pid} = req.params
    let result = await productModel.deleteOne({_id: pid})
    res.send({result: "success", payload: result})
})

module.exports = router