const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: [{
        id: {type: String},
        title: {type:String},
        quantity: {type:Number},
        price: {type: Number},
        name: {type: String},
        totalPrice: {type: Number}
    }],
    totalQuantity: {type: Number}
})

module.exports = mongoose.model('Cart',cartSchema);