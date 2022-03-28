import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { User } from '../repositories/User';
import  JWT  from "jsonwebtoken";

const protect = async(req:Request, res:Response, next)=>{
    try{
        let token:string;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            const response:ResponseHandler = new ResponseHandler({
                statusCode: 401,
                data:'SORRY! But You Are Not Authorized Tp Access This Route!',
                operand:'User',
                operation:'Authenticating',
            })
            response.respond();
            return res.status(401).send(response.response);
        }

        const decode = await JWT.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findBy('id', decode)[0];

        req['user'] = user;

        next();
    }
    catch(err){}
}


export{
    protect
}