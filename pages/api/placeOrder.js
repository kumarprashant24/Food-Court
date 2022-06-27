import mongoose from 'mongoose';
import conn from '../../dbConn';
import cart from '../../models/cart.model'
conn();

export default async function bag(req, res) {
  
   const data = {items:req.body.items,grand_total:req.body.grand_total,status:req.body.status}
   const uid = mongoose.Types.ObjectId(req.body.userId);
   const result = await cart.findOne({ordered_by:uid});
   result.order_placed.push(data)
   result.save();
   res.send({message:'success'})

  }