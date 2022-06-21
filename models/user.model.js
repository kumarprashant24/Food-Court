const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    phone_number:String,
    shipping_address:String,
    landmark:String,
    city:String,
    state:String,
    zip:String

});

module.exports = mongoose.models.user ||  mongoose.model('user', userSchema);