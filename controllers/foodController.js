const mongoose = require("mongoose");
const FoodItem = require("../models/FoodItem");
const Order = require("../models/Order");
const Cart = require('../models/Cart');

const getFoodItems = async (req, res, next) => {
  const items = await FoodItem.find();
  if (!items) {
    return res.json({ items: [] });
  }
  return res.json({ items: items });
};

const postFoodItem = async (req, res, next) => {
  const { name, description, price, token } = req.body;
  console.log(req.body);
  console.log(process.env.SECRET_TOKEN);
  if (token !== process.env.SECRET_TOKEN) {
    return res.json({ error: "Sure you got the right token?" });
  }
  const newFoodItem = new FoodItem({
    name: name,
    description: description,
    price: price,
  });
  const savedFoodItem = await newFoodItem.save();
  if (savedFoodItem) {
    return res.json({
      message: "Successfully added to DB!",
      item: savedFoodItem,
    });
  }
  return res.json({ error: "Some error occured" });
};

const postOrder = async (req, res, next) => {
  const { user, orderedItems } = req.body;
  const newOrder = new Order({
    user: user,
    orderedItems: orderedItems,
  });
  const savedOrder = await newOrder.save();
  if (savedOrder) {
    return res.json({ message: "Saved successfully", order: savedOrder });
  }
  return res.json({ error: "Some error occurred" });
};

const getCart = async(req,res,next) => {
    const cartId = "65057f832ed45a6436f7b794";
    const existingCart = await Cart.findById(cartId);
    if(existingCart){
        return res.json({cart:existingCart});
    }
    return res.json({cart: [],error:'Unable to fetch cart'})
}

const putCart = async(req,res,next) => {
    const cartId = "65057f832ed45a6436f7b794";
    const {items, totalQuantity} = req.body;
    const deleteCart = await Cart.findByIdAndDelete(cartId);
    if(deleteCart){
        const updatedCart = new Cart({
            _id: cartId,
            items,
            totalQuantity
        })
        const saveUpdatedCart = updatedCart.save();
        if(saveUpdatedCart){
            return res.json({message: 'Cart updated successfully',cart: saveUpdatedCart}); 
        }
    }
    else{
        const newCart = new Cart({
            _id: cartId,
            items,
            totalQuantity
        })
        const saveNewCart = newCart.save();
        if(saveNewCart){
            return res.json({message: 'New Cart saved successfully',cart: saveNewCart}); 
        }
    }
    return res.json({error:'Unable to store cart! Try again'});
}

exports.getFoodItems = getFoodItems;
exports.postFoodItem = postFoodItem;
exports.postOrder = postOrder;
exports.putCart = putCart;
exports.getCart = getCart;
