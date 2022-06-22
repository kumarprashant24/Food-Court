import mongoose from 'mongoose';
import conn from '../../dbConn';
import cart from '../../models/cart.model'
conn();

export default async function bag(req, res) {
    let data = req.body
    const uid  =  mongoose.Types.ObjectId(req.body.id);
     const result =  await cart.findOne({ordered_by:uid})
    res.send(result)
 
  }