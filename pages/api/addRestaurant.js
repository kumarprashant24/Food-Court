import conn from '../../dbConn';
import restaurant from '../../models/resturant.model'
conn();

export default async function resturant(req, res) {
    const data = (req.body);
    // const data = await restaurant.find();
    restaurant(data).save();
    
    res.send({message:'success'})
  }