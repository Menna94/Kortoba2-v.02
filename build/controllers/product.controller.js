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
//@route    POST /products/
//@access   private/@user/@admin
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const { id, title, price, shortDescription, imgURL, user_id } = req.body;
        const product = new Product_1.Product(req.body);
        yield product.save();
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({ statusCode: 404, data: null, operation: 'Creating', operand: 'Product' });
            response.respond();
            return res.status(200).send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 200, data: product, operation: 'Creating', operand: 'Product' });
        response.respond();
        res.status(200).send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 500, data: err.message, operation: 'Creating', operand: 'Product' });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.addProduct = addProduct;
//@desc     Fetch All Products
//@route    GET /products/
//@access   public
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const products = yield Product_1.Product.find();
        if (!products) {
            response = new ResponseHandler_1.ResponseHandler({ statusCode: 404, data: null, operation: 'fetching', operand: 'products' });
            response.respond();
            return res.status(200).send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 200, data: products, operation: 'fetching', operand: 'products' });
        response.respond();
        res.status(200).send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 500, data: err.message, operation: 'fetching', operand: 'products' });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.getProducts = getProducts;
//@desc     Fetch A Product
//@route    GET /products/:id
//@access   private/@publisher/@admin
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = req.params.id;
    try {
        const product = yield Product_1.Product.findBy('id', id);
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({ statusCode: 404, data: null, operation: 'fetching', operand: 'products' });
            response.respond();
            return res.status(200).send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 200, data: product, operation: 'fetching', operand: 'products' });
        response.respond();
        res.status(200).send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 500, data: err.message, operation: 'fetching', operand: 'products' });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.getProduct = getProduct;
//@desc     Update A Product
//@route    PUT /products/:id
//@access   private/@publisher/@admin
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        const { title, price, shortDescription, imgURL, } = req.body;
        const product = yield Product_1.Product.update(id, req.body);
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({ statusCode: 404, data: null, operation: 'Updating', operand: 'Product' });
            response.respond();
            return res.status(200).send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 200, data: product, operation: 'Updating', operand: 'Product' });
        response.respond();
        res.status(200).send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 500, data: err.message, operation: 'Updating', operand: 'Product' });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.updateProduct = updateProduct;
//@desc     Delete A Product
//@route    DELETE /products/:id
//@access   private/@publisher/@admin
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        const product = yield Product_1.Product.findBy('id', id);
        if (!product) {
            response = new ResponseHandler_1.ResponseHandler({ statusCode: 404, data: null, operation: 'Deleting', operand: 'Product' });
            response.respond();
            return res.status(200).send(response.response);
        }
        else {
            const delProduct = yield Product_1.Product.delete(id);
            if (!delProduct) {
                response = new ResponseHandler_1.ResponseHandler({ statusCode: 400, data: null, operation: 'Deleting', operand: 'Product' });
                response.respond();
                return res.status(200).send(response.response);
            }
            response = new ResponseHandler_1.ResponseHandler({ statusCode: 200, data: null, operation: 'Deleting', operand: 'Product' });
            response.respond();
            res.status(200).send(response.response);
        }
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 500, data: err.message, operation: 'Deleting', operand: 'Product' });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.deleteProduct = deleteProduct;
