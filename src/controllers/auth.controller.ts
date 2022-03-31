import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { IUser } from "../models/User";
import { User } from "../repositories/User";
import bcrypt from "bcrypt";

//@desc     Signup
//@route    POST api/auth/signup
//@access   puplic
export const signUp = async (req: Request, res: Response) => {
  let response;
  try {
    const { name, email, password }: IUser = req.body;

    //hashing password
    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPass,
    });
    await user.save();

    if (!user) {
      response = new ResponseHandler({
        statusCode: 400,
        data: null,
        operation: "Signing-up",
        operand: "User",
      });
      response.respond();
      return res.status(400).send(response.response);
    }
    response = new ResponseHandler({
      statusCode: 200,
      data: user,
      operation: "Signing-up",
      operand: "User",
    });
    response.respond();
    res.status(200).send(response.response);
  } catch (err) {
    response = new ResponseHandler({
      statusCode: 500,
      data: err.message,
      operation: "Signing-up",
      operand: "User",
    });
    response.respond();
    return res.status(500).send(response.response);
  }
};




//@desc     Login
//@route    POST api/users/login
//@access   public
export const login = async (req: Request, res: Response) => {
  let response;
  try {
    console.log('from try');
    
    const { email, password } = req.body;

    //check if the user entered both email & password
    if(!email || !password){
      console.log('from !email || !password');
      
      response = new ResponseHandler({
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
    const user = await User.findBy("email", email)[0];

    if (!user) {
      console.log('from !user');

      //if email doesn't exist, inform the user that email doesn't exist
      response = new ResponseHandler({
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
      const matchPass = await bcrypt.compare(password, user.password);

      if (!matchPass) {
        response = new ResponseHandler({
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
      const token = await User.signJWT(user[0].id);

      //(2) create a token-cookie
      const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true, //to be accessible from the server-side only
      };

      response = new ResponseHandler({
        statusCode: 200,
        data: user,
        operation: "Logging-in",
        operand: "User",
        custom: token,
      });
      response.respond();
      return (
        res
          .status(200)
          .cookie("token", token, cookieOptions)
          .send(response.response)
      );

    
  } catch (err) {
    console.log(process.env.PORT);
    console.log('from ise');
    

    response = new ResponseHandler({
      statusCode: 500,
      data: err,
      operation: "Logged-in",
      operand: "User",
    });
    response.respond();
    return res.status(500).send(response.response);
  }
};



//@desc     Logout
//@route    GET api/auth/logout
//@access   private
export const logout = async (req: Request, res: Response) => {
  let response;
  try {
    //clear token data
    res.cookie('token', 'none',{
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly:true
    })
    
      response = new ResponseHandler({
        statusCode: 200,
        data: {},
        operation: "Logging-out",
        operand: "User"
      });
      response.respond();
      return (
        res
          .status(200)
          .send(response.response)
      );

    
  } catch (err) {
    response = new ResponseHandler({
      statusCode: 500,
      data: err,
      operation: "Logging-out",
      operand: "User",
    });
    response.respond();
    return res.status(500).send(response.response);
  }
};