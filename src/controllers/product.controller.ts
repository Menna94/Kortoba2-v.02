import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
// import { DbConnection as  } from "../configs/db";
import { Product } from "../models/Product"



//@desc     Create A Product
//@route    POST /products/
//@access   private/@user/@admin
export const addProduct =  async (req: Request, res: Response) => {
    let response;
    try{
        const { 
            id,
            title,
            price,
            shortDescription,
            imgURL,
            user_id
        } :Product = req.body;
        
        
        const product = new Product(req.body);
        await product.save();

        if (!product) {
            response = new ResponseHandler({ statusCode:404, data: null, operation:'Creating', operand:'Product'} )
            response.respond();
            return res.status(200).send(response.response);
        }
        response = new ResponseHandler({ statusCode:200, data:product, operation:'Creating', operand:'Product'} )
        response.respond();
        res.status(200).send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'Creating', operand:'Product'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}



//@desc     Fetch All Products
//@route    GET /products/
//@access   public
export const getProducts =  async (req: Request, res: Response) => {
    let response;
    try{
        const products = await Product.find()
            if (!products) {
                response = new ResponseHandler({ statusCode:404, data: null, operation:'fetching', operand:'products'} )
                response.respond();
                return res.status(200).send(response.response);
            }
            response = new ResponseHandler({ statusCode:200, data:products, operation:'fetching', operand:'products'} )
            response.respond();
            res.status(200).send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'fetching', operand:'products'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}



//@desc     Fetch A Product
//@route    GET /products/:id
//@access   private/@publisher/@admin
export const getProduct =  async (req: Request, res: Response) => {
    let response;
    const id = req.params.id;
    try{
        const product = await Product.findBy('id', id)
            if (!product) {
                response = new ResponseHandler({ statusCode:404, data: null, operation:'fetching', operand:'products'} )
                response.respond();
                return res.status(200).send(response.response);
            }
            response = new ResponseHandler({ statusCode:200, data:product, operation:'fetching', operand:'products'} )
            response.respond();
            res.status(200).send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'fetching', operand:'products'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}



//@desc     Update A Product
//@route    PUT /products/:id
//@access   private/@publisher/@admin
export const updateProduct =  async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try{
        const { 
            title,
            price,
            shortDescription,
            imgURL,
        } :Product = req.body;
        
        
        const product = await Product.update(id, req.body)

        if (!product) {
            response = new ResponseHandler({ statusCode:404, data: null, operation:'Updating', operand:'Product'} )
            response.respond();
            return res.status(200).send(response.response);
        }
        response = new ResponseHandler({ statusCode:200, data:product, operation:'Updating', operand:'Product'} )
        response.respond();
        res.status(200).send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'Updating', operand:'Product'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}


//@desc     Delete A Product
//@route    DELETE /products/:id
//@access   private/@publisher/@admin
export const deleteProduct =  async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try{

        const product = await Product.findBy('id', id);

        if(!product){
            response = new ResponseHandler({ statusCode:404, data: null, operation:'Deleting', operand:'Product'} )
            response.respond();
            return res.status(200).send(response.response);
        }else{
            const delProduct = await Product.delete(id);

            if (!delProduct) {
                response = new ResponseHandler({ statusCode:400, data: null, operation:'Deleting', operand:'Product'} )
                response.respond();
                return res.status(200).send(response.response);
            }
            response = new ResponseHandler({ statusCode:200, data:null, operation:'Deleting', operand:'Product'} )
            response.respond();
            res.status(200).send(response.response);
        }
        
        
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'Deleting', operand:'Product'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}