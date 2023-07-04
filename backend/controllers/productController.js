const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose")
const { ObjectId } = require('mongodb');



//Get all products - app.get("/products", 
const getAllProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Find a product by id app.get("/products/:id", 
const findProductbyID = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})  
    }
})

//Create a product app.post("/products", 
const createProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Update a product app.put("/products/:id",
const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const objectID = new ObjectId(id);
        
        const product = await Product.findByIdAndUpdate(objectID, req.body)
        if(!product){
            return res.status(404).send({message: "Product not found"})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Delete a product -app.delete("/products/:id", 
const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} =req.params;
        const objectID = new ObjectId(id);
        const product = await Product.findByIdAndDelete(objectID);
        if(!product){
            return res.status(404).send({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

module.exports = {
    createProduct,
    findProductbyID,
    getAllProducts,
    updateProduct,
    deleteProduct,
    findProductbyID,
  };