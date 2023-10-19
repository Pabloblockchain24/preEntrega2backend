const express = require("express")
const { default: mongoose } = require("mongoose")
const path = require('path');
const handlebars = require('express-handlebars');

const productView = require("./routes/productView.router.js")
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const cartView = require("./routes/cartView.router.js")


const app = express()
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine)
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, + "/views"))
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error);
    })
    
app.use("/products", productView)
app.use("/carts", cartView)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
