import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { User } from '../repositories/User';
import  JWT  from "jsonwebtoken";

const protect = async(req:Request, res:Response, next)=>{
    let token:string;
    try{
        //check if the user is loggedin
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            //if yes, extract user token from the header
            //authorization header is a sting that contains 'Bearer ' then the token part
            //ex: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
            token = req.headers.authorization.split(' ')[1];
        }

        //if the user is not authenticated
        if(!token){ 
            const response:ResponseHandler = new ResponseHandler({
                statusCode: 401,
                data:'SORRY! But You Are Not Authorized Tp Access This Route!',
                operand:'User',
                operation:'Authenticating',
            })
            response.respond();
            return res
                    .status(401)
                    .send(response.response);
        }
        //verify the token in the header 
        const decode = await JWT.verify(token, process.env.TOKEN_SECRET);

        //
        const user = await User.findBy('id', decode)[0];

        req['user'] = user;

        next();
    }
    catch(err){}
}


export{
    protect
}