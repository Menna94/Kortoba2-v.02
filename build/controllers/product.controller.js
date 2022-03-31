"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.addProduct = void 0;
const ResponseHandler_1 = require("../helper/ResponseHandler");
const Product_1 = require("../repositories/Product");
//@desc     Create A Product
//@route    POST /api/products
//@access   private/@user/@admin
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const { id, title, price, shortDescription, imgURL, user_id } = req.body;
        //create an instance of a product
        const product = new Product_1.Product({
            id,
            title,
            price,
            shortDescription,
            imgURL,
            user_id
        });
        yield product.save();
        //if something went wrong while creating the product
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 400,
                data: null,
                operation: 'Creating',
                operand: 'Product',
            });
            response.respond();
            return res
                .status(400)
                .send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 201,
            data: product,
            operation: 'Creating',
            operand: 'Product'
        });
        response.respond();
        res
            .status(201)
            .send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Creating',
            operand: 'Product'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.addProduct = addProduct;
//@desc     Fetch All Products
//@route    GET /api/products
//@access   public
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const products = yield Product_1.Product.find();
        if (!products) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Fetching',
                operand: 'Products'
            });
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 200,
            data: products,
            operation: 'Fetching',
            operand: 'Products'
        });
        response.respond();
        res
            .status(200)
            .send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Fetching',
            operand: 'Products'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.getProducts = getProducts;
//@desc     Fetch A Product
//@route    GET /api/products/:id
//@access   private/@publisher/@admin
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        const product = yield Product_1.Product.findBy('id', id);
        //if there is no product with the provided ID
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Fetching',
                operand: 'Product',
                custom: 'There Is No Product Found With The Provided ID'
            });
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }
        //return the product
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 200,
            data: product,
            operation: 'Fetching',
            operand: 'Product'
        });
        response.respond();
        res
            .status(200)
            .send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Fetching',
            operand: 'Product'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.getProduct = getProduct;
//@desc     Update A Product
//@route    PUT /api/products/:id
//@access   private/@publisher/@admin
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        const { title, price, shortDescription, imgURL, } = req.body;
        //Make sure that the product exists in the database
        const product = yield Product_1.Product.findBy('id', id);
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Updating',
                operand: 'Product',
                custom: 'There Is No Product Found With The Provided ID'
            });
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }
        else {
            const updatedProduct = yield Product_1.Product.update(id, {
                title,
                price,
                shortDescription,
                imgURL
            });
            //if something went wrong while updating the product
            if (!updatedProduct) {
                response = new ResponseHandler_1.ResponseHandler({
                    statusCode: 400,
                    data: null,
                    operation: 'Updating',
                    operand: 'Product'
                });
                response.respond();
                return res
                    .status(400)
                    .send(response.response);
            }
            //return updated product ..(?)
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 200,
                data: product,
                operation: 'Updating',
                operand: 'Product'
            });
            response.respond();
            res
                .status(200)
                .send(response.response);
        }
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Updating',
            operand: 'Product'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.updateProduct = updateProduct;
//@desc     Delete A Product
//@route    DELETE /api/products/:id
//@access   private/@publisher/@admin
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        //Make sure that the product exists in the database
        const product = yield Product_1.Product.findBy('id', id);
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Deleting',
                operand: 'Product',
                custom: 'There Is No Product Found With The Provided ID'
            });
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }
        else {
            const delProduct = yield Product_1.Product.delete(id);
            //if something went wrong while deleting product
            if (!delProduct) {
                response = new ResponseHandler_1.ResponseHandler({
                    statusCode: 400,
                    data: null,
                    operation: 'Deleting',
                    operand: 'Product'
                });
                response.respond();
                return res
                    .status(400)
                    .send(response.response);
            }
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 200,
                data: null,
                operation: 'Deleting',
                operand: 'Product'
            });
            response.respond();
            res
                .status(200)
                .send(response.response);
        }
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Deleting',
            operand: 'Product'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.deleteProduct = deleteProduct;
