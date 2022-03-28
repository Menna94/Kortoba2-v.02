import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { User } from "../repositories/User";
import { IUser } from "../models/User";


//@desc     Fetch All Users
//@route    GET api/users/
//@access   public
export const getUsers =  async (req: Request, res: Response) => {
    let response;
    try{
        const users = await User.find()
            if (!users) {
                response = new ResponseHandler({ statusCode:404, data: null, operation:'Fetching', operand:'Users'} )
                response.respond();
                return res.status(200).send(response.response);
            }
            response = new ResponseHandler({ statusCode:200, data:users, operation:'Fetching', operand:'Users'} )
            response.respond();
            res.status(200).send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'Fetching', operand:'Users'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}



//@desc     Fetch A User
//@route    GET api/users/:id
//@access   private/@user/@admin
export const getUser=  async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try{
        const user = await User.findBy('id', id)
            if (!user) {
                response = new ResponseHandler({ statusCode:404, data: null, operation:'Fetching', operand:'Single User'} )
                response.respond();
                return res.status(200).send(response.response);
            }
            response = new ResponseHandler({ statusCode:200, data:user, operation:'Fetching', operand:'Single User'} )
            response.respond();
            res.status(200).send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'Fetching', operand:'Single User'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}



//@desc     Update A User
//@route    PUT api/users/:id
//@access   private/@user/@admin
export const updateUser =  async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try{
        const { 
            name,
            email,
            password,
        } :IUser = req.body;
        
        
        const user = await User.update(id, req.body)

        if (!user) {
            response = new ResponseHandler({ statusCode:404, data: null, operation:'Updating', operand:'User'} )
            response.respond();
            return res.status(200).send(response.response);
        }
        response = new ResponseHandler({ statusCode:200, data:user, operation:'Updating', operand:'User'} )
        response.respond();
        res.status(200).send(response.response);
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'Updating', operand:'User'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}


//@desc     Delete User
//@route    DELETE api/users/:id
//@access   private/@admin
export const deleteUser=  async (req: Request, res: Response) => {
    let response;
    const id = +req.params.id;
    try{

        const user = await User.findBy('id', id);

        if(!user){
            response = new ResponseHandler({ statusCode:404, data: null, operation:'Deleting', operand:'User'} )
            response.respond();
            return res.status(200).send(response.response);
        }else{
            const delUser = await User.delete(id);

            if (!delUser) {
                response = new ResponseHandler({ statusCode:400, data: null, operation:'Deleting', operand:'User'} )
                response.respond();
                return res.status(200).send(response.response);
            }
            response = new ResponseHandler({ statusCode:200, data:null, operation:'Deleting', operand:'User'} )
            response.respond();
            res.status(200).send(response.response);
        }
        
        
    }

    catch(err){
        response = new ResponseHandler({ statusCode:500, data: err.message, operation:'Deleting', operand:'User'} )
        response.respond();
        return res.status(500).send(response.response);
    }

}