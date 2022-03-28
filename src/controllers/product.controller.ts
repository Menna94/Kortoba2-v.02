import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { Product } from "../repositories/Product";
import { IProduct } from "../models/Product";




//@desc     Create A Product
//@route    POST /api/products
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
        } :IProduct = req.body;
        
        //create an instance of a product
        const product = new Product({
                                    id,
                                    title,
                                    price,
                                    shortDescription,
                                    imgURL,
                                    user_id
                                });
        await product.save();

        //if something went wrong while creating the product
        if (!product) {
            response = new ResponseHandler({ 
                statusCode:400, 
                data: null, 
                operation:'Creating', 
                operand:'Product',
            } )
            response.respond();
            return res
                    .status(400)
                    .send(response.response);
        }
        response = new ResponseHandler({ 
            statusCode:201, 
            data:product, 
            operation:'Creating', 
            operand:'Product'
        })
        response.respond();
        res
            .status(201)
            .send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ 
            statusCode:500, 
            data: err.message, 
            operation:'Creating', 
            operand:'Product'
        })
        response.respond();
        return res
                .status(500)
                .send(response.response);
    }

}



//@desc     Fetch All Products
//@route    GET /api/products
//@access   public
export const getProducts =  async (req: Request, res: Response) => {
    let response;
    try{
        const products = await Product.find()
        if (!products) {
            response = new ResponseHandler({ 
                statusCode:404, 
                data: null, 
                operation:'Fetching', 
                operand:'Products'
            })
            response.respond();
            return res
                    .status(404)
                    .send(response.response);
        }

        response = new ResponseHandler({ 
            statusCode:200, 
            data:products, 
            operation:'Fetching', 
            operand:'Products'
        })
        response.respond();
        res
            .status(200)
            .send(response.response);
    }
    catch(err){
        response = new ResponseHandler({ 
            statusCode:500, 
            data: err.message, 
            operation:'Fetching', 
            operand:'Products'
        })
        response.respond();
        return res
                .status(500)
                .send(response.response);
    }

}



//@desc     Fetch A Product
//@route    GET /api/products/:id
//@access   private/@publisher/@admin
export const getProduct =  async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try{
        const product = await Product.findBy('id', id);

        //if there is no product with the provided ID
        if (!product) {
            response = new ResponseHandler({ 
                statusCode:404, 
                data: null, 
                operation:'Fetching', 
                operand:'Product', 
                custom: 'There Is No Product Found With The Provided ID'
            })
            response.respond();
            return res
                    .status(404)
                    .send(response.response);
        }
        //return the product
        response = new ResponseHandler({ 
            statusCode:200, 
            data:product, 
            operation:'Fetching', 
            operand:'Product'
        })
        response.respond();
        res
            .status(200)
            .send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ 
            statusCode:500, 
            data: err.message, 
            operation:'Fetching', 
            operand:'Product'
        })
        response.respond();
        return res
                .status(500)
                .send(response.response);
    }

}



//@desc     Update A Product
//@route    PUT /api/products/:id
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
        } :IProduct = req.body;
        
        //Make sure that the product exists in the database
        const product = await Product.findBy('id', id);
        if (!product) {
            response = new ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Updating',
                operand: 'Product',
                custom: 'There Is No Product Found With The Provided ID'
            })
            response.respond();
            return res
                .status(404)
                .send(response.response);
        } else {
            const updatedProduct = await Product.update(id, {
                title,
                price,
                shortDescription,
                imgURL
            })
    
            //if something went wrong while updating the product
            if (!updatedProduct) {
                response = new ResponseHandler({ 
                    statusCode:400, 
                    data: null, 
                    operation:'Updating', 
                    operand:'Product'
                })
                response.respond();
                return res
                        .status(400)
                        .send(response.response);
            }

            //return updated product ..(?)
            response = new ResponseHandler({ 
                statusCode:200, 
                data:product, 
                operation:'Updating', 
                operand:'Product'
            })
            response.respond();
            res
                .status(200)
                .send(response.response);
        }
        
    }
    catch(err){
        response = new ResponseHandler({ 
            statusCode:500, 
            data: err.message, 
            operation:'Updating', 
            operand:'Product'
        })
        response.respond();
        return res
                .status(500)
                .send(response.response);
    }

}


//@desc     Delete A Product
//@route    DELETE /api/products/:id
//@access   private/@publisher/@admin
export const deleteProduct =  async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try{

        //Make sure that the product exists in the database
        const product = await Product.findBy('id', id);
        if (!product) {
            response = new ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Deleting',
                operand: 'Product',
                custom: 'There Is No Product Found With The Provided ID'
            })
            response.respond();
            return res
                .status(404)
                .send(response.response);
        } else {
            const delProduct = await Product.delete(id);

            //if something went wrong while deleting product
            if (!delProduct) {
                response = new ResponseHandler({ 
                    statusCode:400, 
                    data: null, 
                    operation:'Deleting', 
                    operand:'Product'
                })
                response.respond();
                return res
                        .status(400)
                        .send(response.response);
            }
            
            response = new ResponseHandler({ 
                statusCode:200, 
                data:null, 
                operation:'Deleting', 
                operand:'Product'
            })
            response.respond();
            res
                .status(200)
                .send(response.response);
        }
    }

    catch(err){
        response = new ResponseHandler({ 
            statusCode:500, 
            data: err.message, 
            operation:'Deleting', 
            operand:'Product'
        })
        response.respond();
        return res
                .status(500)
                .send(response.response);
    }

}