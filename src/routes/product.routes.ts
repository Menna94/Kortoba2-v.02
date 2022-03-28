import { Router } from "express";
import { addProduct, getProduct, getProducts } from "../controllers/product.controller";

const router = Router();


router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', addProduct);


export { router };