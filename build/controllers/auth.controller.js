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
exports.login = exports.signUp = void 0;
const ResponseHandler_1 = require("../helper/ResponseHandler");
const User_1 = require("../repositories/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
//@desc     Signup
//@route    POST api/auth/signup
//@access   puplic
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const { name, email, password } = req.body;
        //hashing password
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.User({
            name,
            email,
            password: hashedPass,
        });
        yield user.save();
        if (!user) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 400,
                data: null,
                operation: "Signing-up",
                operand: "User",
            });
            response.respond();
            return res.status(400).send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 200,
            data: user,
            operation: "Signing-up",
            operand: "User",
        });
        response.respond();
        res.status(200).send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: "Signing-up",
            operand: "User",
        });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.signUp = signUp;
//@desc     Login
//@route    POST api/users/login
//@access   public
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        console.log('from try');
        const { email, password } = req.body;
        //check if the user entered both email & password
        if (!email || !password) {
            console.log('from !email || !password');
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 401,
                data: null,
                operation: "Logging-in",
                operand: "User",
                custom: "You Have To Provide Both Email & Password!",
            });
            response.respond();
            return res.status(401).send(response.response);
        }
        //check if user existed in the database
        const user = yield User_1.User.findBy("email", email)[0];
        if (!user) {
            console.log('from !user');
            //if email doesn't exist, inform the user that email doesn't exist
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: "Logging-in",
                operand: "User",
                custom: "This User Does Not Exist In The Database",
            });
            response.respond();
            return res.status(404).send(response.response);
        }
        console.log('from else');
        //check if the provided password matches the one in the Database
        const matchPass = yield bcrypt_1.default.compare(password, user.password);
        if (!matchPass) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 401,
                data: null,
                operation: "Logging-in",
                operand: "User",
                custom: "Wrong Credentials",
            });
            response.respond();
            return res.status(401).send(response.response);
        }
        //(1) sign JWT token
        const token = yield User_1.User.signJWT(user[0].id);
        //(2) create a token-cookie
        const cookieOptions = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, //to be accessible from the server-side only
        };
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 200,
            data: user,
            operation: "Logging-in",
            operand: "User",
            custom: token,
        });
        response.respond();
        return (res
            .status(200)
            .cookie("token", token, cookieOptions)
            .send(response.response));
    }
    catch (err) {
        console.log(process.env.PORT);
        console.log('from ise');
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err,
            operation: "Logged-in",
            operand: "User",
        });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.login = login;
