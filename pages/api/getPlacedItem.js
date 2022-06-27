import mongoose from 'mongoose';
import conn from '../../dbConn';
import cart from '../../models/cart.model'
conn();

export default async function bag(req, res) {

    const userId = mongoose.Types.ObjectId(req.body.userId);

    const data =  await cart.findOne({ordered_by:userId})

    res.send(data)



}