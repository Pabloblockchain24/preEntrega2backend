const express = require("express")
const { default: mongoose } = require("mongoose")
const { productModel } = require("../models/product.model")
const router = express.Router()

router.get("/", async(req, res) => {
    await mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")
    let limite = parseInt(req.query.limit)
    let sortDirection = req.query.sortDirection

    try{
        let aggregationPipeline = [];
        if (limite) {
            aggregationPipeline.push({
                $limit: limite
            });
        } else {
            aggregationPipeline.push({
                $limit: 10
            });
        }
        if (sortDirection === "asc") {
            aggregationPipeline.push({
              $sort: { precio: 1 }
            });
          } else if (sortDirection === "des") {
            aggregationPipeline.push({
              $sort: { precio: -1 }
            });
          }
        

        let productos = await productModel.aggregate(aggregationPipeline).exec();
        res.render("index.hbs", {
            productos
        })
    }catch(error){
        console.log(error)
    }
})

module.exports = router