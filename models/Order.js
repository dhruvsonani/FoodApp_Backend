const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    user: {
        name: {type: String,required:true},
        address: {type: String, required: true},
        pincode: {type:Number, required: true},
        city: {type: String, required: true}
    },
    orderedItems: [{
        name:{type: String, required: true},
        price: {type: Number, required: true},
        amount: {type: Number, required: true}
    }]
})

module.exports = mongoose.model('Order', Order);