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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const ResponseHandler_1 = require("../helper/ResponseHandler");
const User_1 = require("../repositories/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    try {
        //check if the user is loggedin
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            //if yes, extract user token from the header
            //authorization header is a sting that contains 'Bearer ' then the token part
            //ex: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
            token = req.headers.authorization.split(' ')[1];
        }
        //if the user is not authenticated
        if (!token) {
            const response = new ResponseHandler_1.ResponseHandler({
                statusCode: 401,
                data: 'SORRY! But You Are Not Authorized Tp Access This Route!',
                operand: 'User',
                operation: 'Authenticating',
            });
            response.respond();
            return res
                .status(401)
                .send(response.response);
        }
        //verify the token in the header 
        const decode = yield jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        //
        const user = yield User_1.User.findBy('id', decode)[0];
        req['user'] = user;
        next();
    }
    catch (err) { }
});
exports.protect = protect;
