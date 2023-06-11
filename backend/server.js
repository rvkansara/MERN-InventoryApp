const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Models
const Product = require('./models/productModel');

//Server
const app = express();

//Middleware   
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
    res.send("Home Page")
})

app.get("/about", (req, res) => {
    res.send("Stuff about me")
})

//Get all products
app.get("/products", async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Find a product by id
app.get("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})  
    }
})

//Create a product
app.post("/products", async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Update a product
app.put("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
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

//Delete a product
app.delete("/products/:id", async(req, res) => {
    try {
        const {id} =req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).send({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

const PORT = process.env.port || 5000;

//Connect to MongoDB and Start the Server
mongoose
    .connect("mongodb+srv://kansara:Nbc7YDQ3FTad0d6c@inventory.hzdkpav.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });    
    })
    .catch((err) => console.log(err));
