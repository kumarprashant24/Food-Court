const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const resturantSchema = new mongoose.Schema({
  name: String,
  menu: [{food_name:String,price:String,image:String}],
  picture: String, 
});

module.exports = mongoose.models.restaurant ||  mongoose.model('restaurant', resturantSchema);