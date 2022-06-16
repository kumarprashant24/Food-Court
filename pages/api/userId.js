import conn from '../../dbConn';
import user from '../../models/user.model'
conn();

export default async function resturant(req, res) {
    const email = req.body.email
    const data = await user.findOne({email:email});
  
    
    res.send(data)
  }