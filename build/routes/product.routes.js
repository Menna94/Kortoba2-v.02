"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const product_controller_1 = require("../controllers/product.controller");
const ProductRoutes = (router) => {
    const route = '/api/products';
    router
        .route(`${route}/`)
        .get(product_controller_1.getProducts) //Fetch All Products => GET /api/products
        .post(product_controller_1.addProduct); //Create A Product => POST /api/products
    router
        .route(`${route}/:id`)
        .get(product_controller_1.getProduct) //Fetch Single Product => GET /api/products/:id
        .put(product_controller_1.updateProduct) //Update Single Product => PUT /api/products/:id
        .delete(product_controller_1.deleteProduct); //Delete Single Product => DELETE /api/products/:id
};
exports.ProductRoutes = ProductRoutes;
