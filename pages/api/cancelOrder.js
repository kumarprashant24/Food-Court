import mongoose from 'mongoose';
import conn from '../../dbConn';
import cart from '../../models/cart.model'
conn();

export default async function bag(req, res) {

    const userId = mongoose.Types.ObjectId(req.body.userId);
    const orderId = mongoose.Types.ObjectId(req.body.orderId);

    await cart.updateOne(
        { 'ordered_by': userId },
        { $pull: { "order_placed": { _id: orderId } } },

    );

    res.send({ message: 'success' })



}