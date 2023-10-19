const { Router } = require("express")
const router = Router()
const cartModel = require("../models/cart.model.js");
const productModel = require("../models/product.model.js")
const mongoose = require("mongoose")


 getCartById = async(cid)=>{
    try {
        const cart = await cartModel.findById(cid).populate("productos.product").lean();
        return cart;
    } catch (error) {
        console.log(error);
    }
};

router.get("/:cid", async (req, res) => {
    let cid = req.params.cid
    try {
        const carrito = await getCartById(cid)
        if (!carrito) {
            return res.send({ message: "carrito no encontrado" })
        }
        res.render("carts.hbs", {
            carrito
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router