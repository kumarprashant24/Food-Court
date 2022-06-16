const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,

});

module.exports = mongoose.models.user ||  mongoose.model('user', userSchema);