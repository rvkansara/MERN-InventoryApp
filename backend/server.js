const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Models + Routes Required
const Product = require('./models/productModel');
const productRoute = require('./routes/productRoute');

//Server
const app = express();

//Middleware   
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route Middleware
app.use("/products", productRoute);

//Routes
app.get("/", (req, res) => {
    res.send("Home Page")
})



const PORT = process.env.port || 5000;

//Connect to MongoDB and Start the Server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });    
    })
    .catch((err) => console.log(err));
