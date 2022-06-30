import mongoose from 'mongoose';
import conn from '../../dbConn';
import cart, { findOne } from '../../models/cart.model'
conn();

export default async function removeItem(req, res) {
    let data = req.body
    data.uid = mongoose.Types.ObjectId(req.body.uid);
    data.elementId = mongoose.Types.ObjectId(req.body.elementId);

    await cart.updateOne(
        { 'ordered_by': data.uid },
        { $pull: { "order_details": { _id: data.elementId } } },

    );

    res.send({ message: 'success' })

}