import mongoose from 'mongoose';
import conn from '../../dbConn';
import cart from '../../models/cart.model'
conn();

export default async function bag(req, res) {
    let data = req.body
    data.ordered_by =  mongoose.Types.ObjectId(req.body.ordered_by);
   const result= await cart.findOne({ordered_by:data.ordered_by})
   if(result === null)
   {
      cart(data).save();
   }
   else{
    result.order_details.push(data.order_details[0]);
    result.save();
   }
   res.send({message:'success'})
   // console.log(result);
  }