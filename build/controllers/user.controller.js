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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const ResponseHandler_1 = require("../helper/ResponseHandler");
const User_1 = require("../repositories/User");
//@desc     Fetch All Users
//@route    GET /api/users
//@access   public
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const users = yield User_1.User.find();
        //if there are no users
        if (!users) {
            response = new ResponseHandler_1.ResponseHandler({ statusCode: 404, data: null, operation: 'Fetching', operand: 'Users' });
            response.respond();
            return res.status(404).send(response.response);
        }
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 200, data: users, operation: 'Fetching', operand: 'Users' });
        response.respond();
        res.status(200).send(response.response);
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({ statusCode: 500, data: err.message, operation: 'Fetching', operand: 'Users' });
        response.respond();
        return res.status(500).send(response.response);
    }
});
exports.getUsers = getUsers;
//@desc     Fetch A User
//@route    GET api/users/:id
//@access   private/@user/@admin
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        const user = yield User_1.User.findBy('id', id);
        //if there is no user with the provided ID
        if (!user) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Fetching',
                operand: 'Single User',
                custom: 'There Is No User Found With The Provided ID'
            });
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }
        //if there's a user with the provided ID
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 200,
            data: user,
            operation: 'Fetching',
            operand: 'Single User'
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
            operand: 'Single User'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.getUser = getUser;
//@desc     Update A User
//@route    PUT api/users/:id
//@access   private/@user/@admin
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        const { name, email, password, } = req.body;
        //Make sure that the user exists in the database
        const user = yield User_1.User.findBy('email', email);
        if (!user) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Updating',
                operand: 'User',
                custom: 'There Is No User Found With The Provided ID'
            });
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }
        else {
            const updateUser = yield User_1.User.update(id, { name, email, password });
            //if something went wrong while updating the user
            if (!updateUser) {
                response = new ResponseHandler_1.ResponseHandler({
                    statusCode: 400,
                    data: null,
                    operation: 'Updating',
                    operand: 'User'
                });
                response.respond();
                return res
                    .status(400)
                    .send(response.response);
            }
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 200,
                data: user,
                operation: 'Updating',
                operand: 'User'
            });
            response.respond();
            res.status(200).send(response.response);
        }
    }
    catch (err) {
        response = new ResponseHandler_1.ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Updating',
            operand: 'User'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.updateUser = updateUser;
//@desc     Delete User
//@route    DELETE api/users/:id
//@access   private/@admin
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const id = +req.params.id;
    try {
        //Make sure that the user exists in the database
        const user = yield User_1.User.findBy('id', id);
        if (!user) {
            response = new ResponseHandler_1.ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Deleteing',
                operand: 'User',
                custom: 'There Is No User Found With The Provided ID'
            });
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }
        else {
            const delUser = yield User_1.User.delete(id);
            //if something went wrong while deleting user
            if (!delUser) {
                response = new ResponseHandler_1.ResponseHandler({
                    statusCode: 400,
                    data: null,
                    operation: 'Deleting',
                    operand: 'User'
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
                operand: 'User'
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
            operand: 'User'
        });
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }
});
exports.deleteUser = deleteUser;
