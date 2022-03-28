import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller";


export const ProductRoutes = (router:Router)=>{
    router
        .route('/')
            .get(getProducts)//Fetch All Products => GET /api/products
            .post(addProduct)//Create A Product => POST /api/products

    router
        .route('/:id')
            .get(getProduct)//Fetch Single Product => GET /api/products/:id
            .put(updateProduct)//Update Single Product => PUT /api/products/:id
            .delete(deleteProduct)//Delete Single Product => DELETE /api/products/:id
}