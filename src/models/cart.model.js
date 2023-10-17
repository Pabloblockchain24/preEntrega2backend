const mongoose = require("mongoose")
const cartCollection = "carritos"

const cartSchema = new mongoose.Schema({
    productos: []
})

const cartModel = mongoose.model(cartCollection,cartSchema)

module.exports = { cartModel }