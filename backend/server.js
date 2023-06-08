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

const PORT = process.env.port || 5000;

//Connect to MongoDB and Start the Server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });    
    })
    .catch((err) => console.log(err));
