const express = require("express");
const router = express.Router();
const ProductCntrl = require("../Controller/ProductCntrl");

router.route("/products").get(ProductCntrl.getProducts);
router.route("/products/:id").get(ProductCntrl.getProduct);

module.exports = router;
