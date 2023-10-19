const {Router} = require("express")
const router = Router()
const { default: mongoose } = require("mongoose")
const productModel = require("../models/product.model.js")

// obtengo todos los productos en endpoint "/api/products"
router.get("/", async(req,res) => {
    try{
        const productos = await productModel.find({})
        res.send({status: "success", payload: productos})
    }catch(error){
        console.log(error)
    }
})

// obtengo el producto solicitado en endpoint "/api/products/:pid"
router.get("/:pid", async(req,res) => {
    const productId = req.params.pid
    const producto = await productModel.findById(productId)
    try{
        if(producto){
            res.send({result: "success", payload: producto})
        }else{
            res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }
    }catch(error){
        console.log(error)
    }
})

// posteo un nuevo producto en endpoint "/api/products"
router.post("/", async(req,res)=>{
    let {nombre, descripcion, category, precio, availability} = req.body
    try{
        if(!nombre || !descripcion || !category || !precio || !availability){
            res.send({status:"error", error:"faltan datos"})
        }
        let result = await productModel.create({nombre, descripcion, category, precio, availability})
        res.send({result: "success", payload: result })
    }catch(error){
        console.log(error)
    }
})

// actualizo un producto en endpoint "/api/products/:pid"
router.put("/:pid", async(req,res)=>{
    let {pid} =  req.params
    let productToReplace = req.body
    if(!productToReplace.nombre || !productToReplace.descripcion || !productToReplace.precio || !productToReplace.category || !productToReplace.availability){
        res.send({status: "error", error:"no hay datos en parametros"})
    }
    let result = await productModel.updateOne({_id: pid}, productToReplace)
    res.send({result: "success", payload: result })
})

// borro un producto en endpoint "/api/products/:pid"
router.delete("/:pid", async(req,res)=>{
    let {pid} = req.params
    let result = await productModel.deleteOne({_id: pid})
    res.send({result: "success", payload: result})
})

module.exports = router