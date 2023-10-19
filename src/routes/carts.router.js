const {Router} = require("express")
const router = Router()
const  cartModel  = require("../models/cart.model.js");
const  productModel  = require("../models/product.model.js");

// obtengo todos los carritos en endpoint "/api/carts"
router.get("/", async(req,res) => {
    try{
        const carritos = await cartModel.find({})
        res.send({status: "success", payload: carritos})
    }catch(error){
        console.log(error)
    }
})

// Creo nuevos carritos vacios en "/api/carts"
router.post("/", async(req,res)=>{
    try{
        let result = await cartModel.create({})
        res.send({result: "success", payload: result })
    }catch(error){
        console.log(error)
    }

})

// Posteo nuevos productos al carrito en en "/api/carts/:cid/products/:pid"
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

//edito carrito pasado por params en endpoint "/api/carts/:cid"
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

//edito productos del carrito pasado por params en endpoint "/api/carts/:cid/products/:pid"
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

//elimino productos del carrito pasado por params en endpoint "/api/carts/:cid/products/:pid"
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

//vacio carrito pasado por params en endpoint "api/carts/:cid"
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