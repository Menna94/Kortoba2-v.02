"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler_1 = require("../helper/ResponseHandler");
const protect = (req, res, next) => {
    let token;
    let response;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 401,
            data: 'SORRY! But You Are Not Authorized Tp Access This Route!',
            operand: 'User',
            operation: 'Authenticating',
        });
    }
    try {
        next();
    }
    catch (err) { }
};
