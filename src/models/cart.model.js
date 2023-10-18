const mongoose = require("mongoose");

const cartCollection = "carritos"
const mongoosePaginate = require("mongoose-paginate-v2");



const cartSchema = new mongoose.Schema({
    productos: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productos"
            },
            cantidad: Number,
        },
    ],
});


cartSchema.plugin(mongoosePaginate)

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;