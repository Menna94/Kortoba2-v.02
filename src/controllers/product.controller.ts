import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
// import { DbConnection as  } from "../configs/db";
import { Product } from "../models/Product"



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