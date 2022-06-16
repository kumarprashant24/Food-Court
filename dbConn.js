const mongoose = require('mongoose');

export default function conn (){
    if(mongoose.connections[0].readyState){
        console.log("already connected");
        return
    }

    mongoose.connect('mongodb+srv://prashant24:Prince24@cluster0.2pd6v.mongodb.net/food_court?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log('connected to mongo');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('error in connected to mongo');
    })
}