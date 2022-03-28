"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
exports.router = router;
//Fetch All Products
//GET /products/:id
router.get('/', product_controller_1.getProducts);
//Fetch A Product
//GET /products/:id
router.get('/:id', product_controller_1.getProduct);
//Create A Product
//POST /products/:id
router.post('/', product_controller_1.addProduct);
//Update A Product
//PUT /products/:id
router.put('/:id', product_controller_1.updateProduct);
//Delete A Product
//DELETE /products/:id
router.delete('/:id', product_controller_1.deleteProduct);
