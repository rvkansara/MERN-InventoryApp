const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        quantity:{
            type: Number,
            required: [true, "Please add a quantity"],
            default: 0,
        },
        price:{
            type: Number,
            required: [true, "Please add a price"],
            default: 0,
        }
    },{
        timestamps: true
    }
)

const Product = mongoose.model('product', productSchema);

module.exports = Product;