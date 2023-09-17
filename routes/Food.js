const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/',(req,res,next) => {
    res.json({message: 'Follow following routes to get or post food items',get_food_items: 'Go to /api/fooditems', post_food_item: 'Go to /api/fooditem NOTE: you will require a secret token to post fooditem for this. Write a mail at dsonani100800@gmail.com regarding this.' })
})

router.get('/fooditems',foodController.getFoodItems);
router.post('/fooditem',foodController.postFoodItem);

router.post('/new-order',foodController.postOrder);
router.put('/cart',foodController.putCart);
router.get('/cart',foodController.getCart);

module.exports = router;