const {Router} = require("express")
const router = Router()
const  cartModel  = require("../models/cart.model.js");
const  productModel  = require("../models/product.model.js");


// router.get("/", async(req,res) => {
//     await mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")
//     let productos = await productModel.aggregate()
//     try{
//         res.send({status: "success", payload: productos})
//     }catch(error){
//         console.log(error)
//     }
// })



// ruta para postear nuevos carritos 

router.post("/", async(req,res)=>{
    try{
        let result = await cartModel.create({})
        res.send({result: "success", payload: result })
    }catch(error){
        console.log(error)
    }

})

router.post("/:cid/products/:pid", async(req,res) =>{
    let {cid, pid} = req.params
    try{
        const carrito = await cartModel.findById(cid)  
        if(!carrito){
        return res.send({message: "carrito no encontrado"})
        }

        const producto = await productModel.findById(pid)
        if(!producto){
            return res.send({message: "producto no encontrado"})
        }

        const probando = {_id:pid, cantidad:1}

        carrito.productos.push(probando)
        let result = await carrito.save();
        res.send({result: "success", payload: result })

    }catch(error){
        console.log(error)
    }

})

router.put("/:cid", async(req,res)=>{
    let cid = req.params.cid
    try{
        const carrito = await cartModel.findById(cid)  
    if(!carrito){
        return res.send({message: "carrito no encontrado"})
    }
    carrito.productos=[{
        _id: "652f29c8bcd165042c0323d2",
        cantidad: 2
      },
      {
        _id: "652f29bfbcd165042c0323d0",
        cantidad:3
      }
    ]
    let result = await carrito.save()
    res.send({result: "success", payload: result })
    }catch(error){
    console.log(error)
}
})


router.put("/:cid/products/:pid", async(req,res)=>{
    let cid = req.params.cid
    let pid = req.params.pid
    let cantidadNueva = req.body.cantidad
    try{
        const carrito = await cartModel.findById(cid)  
    if(!carrito){
        return res.send({message: "carrito no encontrado"})
    }
    const producto = carrito.productos.findIndex(producto => producto._id === pid)
    if(producto === -1){
        return res.send({message: "producto no encontrado"})
    }
    carrito.productos[producto].cantidad = cantidadNueva
    let result = await carrito.save()
    res.send({result: "success", payload: result })
    }catch(error){
    console.log(error)
}
})

router.delete("/:cid/products/:pid", async(req,res)=>{
    let {cid, pid} = req.params
    try{
        const carrito = await cartModel.findById(cid)  
    if(!carrito){
        return res.send({message: "carrito no encontrado"})
    }
    const producto = carrito.productos.findIndex(producto => producto._id === pid)
    if(producto === -1){
        return res.send({message: "producto no encontrado"})
    }
    carrito.productos.splice(producto,1)
    let result = await carrito.save()
    res.send({result: "success", payload: result })
} catch(error){
    console.log(error)
}
})

router.delete("/:cid", async(req,res)=>{
    let cid = req.params.cid
    try{
        const carrito = await cartModel.findById(cid)  
    if(!carrito){
        return res.send({message: "carrito no encontrado"})
    }
    carrito.productos=[]
    let result = await carrito.save()
    res.send({result: "success", payload: result })

} catch(error){
    console.log(error)
}
})

module.exports = router