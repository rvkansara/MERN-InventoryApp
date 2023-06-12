const express = require('express');
const router = express.Router();
const {
    createProduct,
    findProductbyID,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');



router.get("/", getAllProducts);
router.get("/:id", findProductbyID);
router.post("/", createProduct);    
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;