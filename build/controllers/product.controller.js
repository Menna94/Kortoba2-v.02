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
exports.getProduct = exports.getProducts = exports.addProduct = void 0;
const ResponseHandler_1 = require("../helper/ResponseHandler");
// import { DbConnection as  } from "../configs/db";
const Product_1 = require("../models/Product");
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
