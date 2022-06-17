import mongoose from 'mongoose';
import conn from '../../dbConn';
import restaurant from '../../models/resturant.model'
conn();

export default async function resturant(req, res) {
    const data = (req.body);
    const menu = {food_name:req.body.food,price:req.body.price,image:req.body.picture}
    const restro_id =  mongoose.Types.ObjectId(req.body.restro_id);

    const result = await restaurant.findById(restro_id);
    result.menu.push(menu);
    result.save();
    
    res.send({message:'success'})

  }