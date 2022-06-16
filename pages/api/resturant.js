import conn from '../../dbConn';
import restaurant from '../../models/resturant.model'
conn();

export default async function resturant(req, res) {
    const data = await restaurant.find();
    
    res.send(data)
  }