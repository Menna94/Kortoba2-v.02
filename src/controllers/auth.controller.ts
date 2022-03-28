import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { IUser } from "../models/User";
import { User } from "../repositories/User";
import bcrypt from "bcrypt";

//@desc     Signup
//@route    POST api/users/signup
//@access   puplic
export const signUp = async (req: Request, res: Response) => {
  let response;
  try {
    const { name, email, password }: IUser = req.body;

    const user = new User({
      name,
      email,
      password,
    });
    await user.save();

    if (!user) {
      response = new ResponseHandler({
        statusCode: 404,
        data: null,
        operation: "Signing-up",
        operand: "User",
      });
      response.respond();
      return res.status(200).send(response.response);
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
    const { email, password } = req.body;

    //check if user existed in the database
    const user = await User.findBy("email", email);
console.log(user);

    if (!user) {
      //if email doesn't exist, inform the user that email doesn't exist
      response = new ResponseHandler({
        statusCode: 404,
        data: null,
        operation: "Logging-in",
        operand: "User",
        custom: "Wrong Credentials",
      });

      response.respond();
      return res.status(404).send(response.response);
    }
    const matchPass = await bcrypt.compare(password, user[0].password);

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
    response = new ResponseHandler({
      statusCode: 500,
      data: err,
      operation: "Logging-in",
      operand: "User",
    });
    response.respond();
    return res.status(500).send(response.response);
  }
};
