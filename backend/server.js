const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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
