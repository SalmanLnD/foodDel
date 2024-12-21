const userModel = require('../models/userModel');


const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"error"})
    }
}
 
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = userData.cartData;
        res.status(200).json({success:true,data:cartData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"error"})
    }
}

const removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = userData.cartData;
        if(cartData[req.body.itemId]){
            cartData[req.body.itemId]-=1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.status(200).json({success:true,message:"Item removed from cart"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"error"})
    }
}

module.exports = {addToCart, getCart, removeFromCart}