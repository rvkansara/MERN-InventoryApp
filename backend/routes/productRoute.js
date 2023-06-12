const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');



router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);    
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;