import conn from '../../dbConn';
import user from '../../models/user.model'
conn();

export default async function resturant(req, res) {
    
    const data = await user.find();
  
    
    res.send(data)
  }