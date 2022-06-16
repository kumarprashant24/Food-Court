import mongoose from 'mongoose';
import conn from '../../dbConn';
import restaurant from '../../models/resturant.model'
conn();

export default async function resturant(req, res) {
    const uid = mongoose.Types.ObjectId(req.body.id);
 
    const data = await restaurant.findById(uid);
 
    res.send(data)
  }