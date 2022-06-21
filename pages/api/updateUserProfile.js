import mongoose from 'mongoose';
import conn from '../../dbConn';
import user from '../../models/user.model'
conn();

export default async function resturant(req, res) {
    let data = req.body.data
   const uid =  mongoose.Types.ObjectId(req.body.uid);

    await user.findByIdAndUpdate(uid,data,{new:true},function(err, result){
        if(err){
            console.log(err);
        }
        else{
            console.log("done");

        }
    });
    res.send({message:"success"})
  }