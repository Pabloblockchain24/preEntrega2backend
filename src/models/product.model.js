const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2");

const productCollection = "productos"

const productSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    categoria: String,
    precio: Number
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection,productSchema)




module.exports = { productModel }