import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller";

const router = Router();


//Fetch All Products
//GET /products/:id
router.get('/', getProducts);

//Fetch A Product
//GET /products/:id
router.get('/:id', getProduct);

//Create A Product
//POST /products/:id
router.post('/', addProduct);


//Update A Product
//PUT /products/:id
router.put('/:id', updateProduct);


//Delete A Product
//DELETE /products/:id
router.delete('/:id', deleteProduct);

export { router };