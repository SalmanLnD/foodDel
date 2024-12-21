const express = require('express'); 
const {addToCart, getCart, removeFromCart} = require('../controllers/cartController'); 
const authMiddleware = require('../middleware/auth');

const cartRouter = express.Router(); 

cartRouter.post('/add',authMiddleware, addToCart); 
cartRouter.post('/get',authMiddleware, getCart); 
cartRouter.post('/remove',authMiddleware, removeFromCart); 

module.exports = cartRouter; 