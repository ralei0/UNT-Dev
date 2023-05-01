const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    title: {
        type:String,
        required:true,

    },
    price : {
        type:Number,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    imageUrl : {
        type:String,
        required:true
    },
   

});

module.exports = mongoose.model('Product',productSchema);  //mangoose Product ko lower case kar ke esme 's' jod dega aur eska ek collecction bana dega database mai



