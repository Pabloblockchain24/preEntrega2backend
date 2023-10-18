const {Router} = require("express")
const router = Router()
const  cartModel  = require("../models/cart.model.js");
const productModel = require("../models/product.model.js")
const mongoose = require("mongoose")

router.get("/:cid", async(req,res)=>{
    let cid = req.params.cid
    try{

        const carrito = await cartModel.findById(cid).populate('productos.productId').lean();

    if(!carrito){
        return res.send({message: "carrito no encontrado"})
    }

    let aux=carrito.productos
    res.render("carts.hbs", {
        aux
    })
    }catch(error){
    console.log(error)
}
})

module.exports = router