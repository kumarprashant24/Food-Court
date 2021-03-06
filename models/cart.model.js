const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const cartSchema = new mongoose.Schema({
  order_details:[{
  restro_name: String,
  food_name: String,
  price:String,
  picture: String, 
  quantity:String,
  }],
  ordered_by: {
    type: Schema.Types.ObjectId, ref: 'user' 
  }, 
  order_placed:[{
     items:[],
     grand_total:String,
     status:String,
  }]
});

module.exports = mongoose.models.cart ||  mongoose.model('cart', cartSchema);