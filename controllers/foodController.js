const mongoose = require('mongoose');
const FoodItem = require('../models/FoodItem');
const Order = require('../models/Order');

const getFoodItems = async (req,res,next) => {
    const items = await FoodItem.find();
    if(!items){
        return res.json({items: []})
    }
    return res.json({items: items})
}

const postFoodItem = async (req,res,next) => {
    const {name,description, price} = req.body;
    const newFoodItem = new FoodItem({
        name: name,
        description: description,
        price: price
    });
    const savedFoodItem = await newFoodItem.save();
    if(savedFoodItem){
        return res.json({message:'Successfully added to DB!', item: savedFoodItem});
    }
    return res.json({error: 'Some error occured'});
}

const postOrder = async(req,res,next) => {
    const {user, orderedItems} = req.body;
    const newOrder = new Order({
        user: user,
        orderedItems: orderedItems
    });
    const savedOrder = await newOrder.save();
    if(savedOrder){
        return res.json({message:'Saved successfully',order: savedOrder})
    }
    return res.json({error:'Some error occurred'});
}

exports.getFoodItems = getFoodItems;
exports.postFoodItem = postFoodItem;
exports.postOrder = postOrder;