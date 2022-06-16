import mongoose from 'mongoose';
import conn from '../../dbConn';
import cart, { findOne } from '../../models/cart.model'
conn();

export default async function removeItem(req, res) {
    let data = req.body
    data.uid=  mongoose.Types.ObjectId(req.body.uid);
  
   const result= await cart.findOne({ordered_by:data.uid})
   result.order_details.splice(data.index,1)
   result.save();
   res.send({message:'success'})

  }