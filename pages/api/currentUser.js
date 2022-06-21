import mongoose from 'mongoose';
import conn from '../../dbConn';
import user from '../../models/user.model'
conn();

export default async function resturant(req, res) {
    const data = req.body.uid
    const uid =  mongoose.Types.ObjectId(data);
    const result = await user.findById(uid)
  
    
    res.send(result)
    // console.log(uid)
  }