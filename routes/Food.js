const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/fooditems',foodController.getFoodItems);
router.post('/fooditem',foodController.postFoodItem);

router.post('/new-order',foodController.postOrder);

module.exports = router;