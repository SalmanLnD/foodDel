const foodModel = require('../models/foodModel')
const fsPromises = require('fs').promises
const path = require('path')


const addFood = async(req,res)=>{
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save()
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}


//all food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async(req,res)=>{
    try {
        const {id} = req.query
        const food = await foodModel.findById(id)
        await fsPromises.unlink(path.join(__dirname,'..','uploads',`${food.image}`))

        await foodModel.findByIdAndDelete(id)
        res.json({success:true,message:"food removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

module.exports = {addFood,listFood,removeFood}