import {getById} from "../services/products.js"

export const createOrder =async(req,res)=>{
    const {productId,quantity,customerName }=req.body
    const product=await getById(req.mongoConn,productId)
    if ( !product) {
        res.status(404).send('cant find id')
    }else{
         res.status(200).send(product.id)
    }
}


