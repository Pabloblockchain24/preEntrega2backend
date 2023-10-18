const express = require("express")
const { default: mongoose } = require("mongoose")
const productModel = require("../models/product.model")
const router = express.Router()
const paginate = require("mongoose-paginate-v2")

// Dado que hacer los 4 gets era opcional, solo hice 2, el del limit y el del sort.

router.get("/", async (req, res) => {
    await mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")

    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const sortDirection = req.query.sortDirection || ''
    const category = req.query.category || ""
    const availability = req.query.availability || ""

    const sortOptions = {};
    if (sortDirection === 'asc') {
        sortOptions.precio = 1;
    } else if (sortDirection === 'des') {
        sortOptions.precio = -1;
    }

    const filterOptions = {};
    if (category) {
        filterOptions.category = category;
    }
    if (availability) {
        filterOptions.availability = availability;
    }

    productModel.paginate({}, { page, limit, sort: sortOptions }, (err, result) => {
        if (err) {
            return res.status(500).json({ result: 'error', payload: null });
        }
        const prevPage = result.page > 1 ? result.page - 1 : null;
        const nextPage = result.page < result.totalPages ? result.page + 1 : null;

        res.render("index.hbs", {
            productos: result.docs,
            totalPage: result.totalPages,
            prevPage,
            nextPage,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: prevPage ? `/products?page=${prevPage}&limit=${limit}&sortDirection=${sortDirection}&category=${category}&availability=${availability}` : null,
            nextLink: nextPage ? `/products?page=${nextPage}&limit=${limit}&sortDirection=${sortDirection}&category=${category}&availability=${availability}` : null,
        });

        // res.status(200).json({
        //     result: 'success',
        //     payload: result.docs,
        //     totalPage: result.totalPages,
        //     prevPage,
        //     nextPage,
        //     hasPrevPage: result.hasPrevPage,
        //     hasNextPage: result.hasNextPage,
        //     prevLink: prevPage ? `/products?page=${prevPage}&limit=${limit}&sortDirection=${sortDirection}&category=${category}&availability=${availability}` : null,
        //     nextLink: nextPage ? `/products?page=${nextPage}&limit=${limit}&sortDirection=${sortDirection}&category=${category}&availability=${availability}` : null,
        //  });
        // res.render("index.hbs", {
        //     productos: result.docs
        // })
    })

})

module.exports = router