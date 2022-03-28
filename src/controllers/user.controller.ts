import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { User } from "../repositories/User";
import { IUser } from "../models/User";


//@desc     Fetch All Users
//@route    GET /api/users
//@access   public
export const getUsers = async (req: Request, res: Response) => {
    let response;
    try {
        const users = await User.find();
        //if there are no users
        if (!users) {
            response = new ResponseHandler({ statusCode: 404, data: null, operation: 'Fetching', operand: 'Users' })
            response.respond();
            return res.status(404).send(response.response);
        }
        response = new ResponseHandler({ statusCode: 200, data: users, operation: 'Fetching', operand: 'Users' })
        response.respond();
        res.status(200).send(response.response);
    }

    catch (err) {
        response = new ResponseHandler({ statusCode: 500, data: err.message, operation: 'Fetching', operand: 'Users' })
        response.respond();
        return res.status(500).send(response.response);
    }

}



//@desc     Fetch A User
//@route    GET api/users/:id
//@access   private/@user/@admin
export const getUser = async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try {
        const user = await User.findBy('id', id);

        //if there is no user with the provided ID
        if (!user) {
            response = new ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Fetching',
                operand: 'Single User',
                custom: 'There Is No User Found With The Provided ID'
            })
            response.respond();
            return res
                .status(404)
                .send(response.response);
        }

        //if there's a user with the provided ID
        response = new ResponseHandler({
            statusCode: 200,
            data: user,
            operation: 'Fetching',
            operand: 'Single User'
        })
        response.respond();
        res
            .status(200)
            .send(response.response);
    }

    catch (err) {
        response = new ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Fetching',
            operand: 'Single User'
        })
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }

}



//@desc     Update A User
//@route    PUT api/users/:id
//@access   private/@user/@admin
export const updateUser = async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try {
        const {
            name,
            email,
            password,
        }: IUser = req.body;

        //Make sure that the user exists in the database
        const user = await User.findBy('email', email);
        if (!user) {
            response = new ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Updating',
                operand: 'User',
                custom: 'There Is No User Found With The Provided ID'
            })
            response.respond();
            return res
                .status(404)
                .send(response.response);
        } else {
            const updateUser = await User.update(id, { name, email, password })

            //if something went wrong while updating the user
            if (!updateUser) {
                response = new ResponseHandler({
                    statusCode: 400,
                    data: null,
                    operation: 'Updating',
                    operand: 'User'
                })
                response.respond();
                return res
                    .status(400)
                    .send(response.response);
            }

            response = new ResponseHandler({
                statusCode: 200,
                data: user,
                operation: 'Updating',
                operand: 'User'
            })
            response.respond();
            res.status(200).send(response.response);
        }
    }
    catch (err) {
        response = new ResponseHandler({
            statusCode: 500,
            data: err.message,
            operation: 'Updating',
            operand: 'User'
        })
        response.respond();
        return res
            .status(500)
            .send(response.response);
    }

}


//@desc     Delete User
//@route    DELETE api/users/:id
//@access   private/@admin
export const deleteUser = async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try {
        //Make sure that the user exists in the database
        const user = await User.findBy('id', id);
        if (!user) {
            response = new ResponseHandler({
                statusCode: 404,
                data: null,
                operation: 'Deleteing',
                operand: 'User',
                custom: 'There Is No User Found With The Provided ID'
            })
            response.respond();
            return res
                .status(404)
                .send(response.response);
        } else {
            const delUser = await User.delete(id);

            //if something went wrong while deleting user
            if (!delUser) {
                response = new ResponseHandler({ 
                    statusCode: 400, 
                    data: null, 
                    operation: 'Deleting', 
                    operand: 'User' 
                })
                response.respond();
                return res
                        .status(400)
                        .send(response.response);
            }

            response = new ResponseHandler({ 
                statusCode: 200, 
                data: null, 
                operation: 'Deleting', 
                operand: 'User' 
            })
            response.respond();
            res
                .status(200)
                .send(response.response);
        }
    }

    catch (err) {
        response = new ResponseHandler({ 
            statusCode: 500, 
            data: err.message, 
            operation: 'Deleting', 
            operand: 'User' 
        })
        response.respond();
        return res
                .status(500)
                .send(response.response);
    }

}