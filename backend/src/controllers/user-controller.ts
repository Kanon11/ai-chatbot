import { NextFunction, Request,Response } from "express";
import User from "../models/User.js";

import { hash,compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";

export const getAllUsers = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({message:"OK",users})
    } catch (error) {
        console.log(error)
        res.status(200).json({ message: "ERROR", cause: error.message });
    }
}
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = User.findOne({ email });
        if (existingUser) {
          return  res.status(401).json({message:"User already registered"})
        }
        let hasPassword = await hash(password, 10);
        const user = new User({ name, email, password: hasPassword });
        await user.save();

        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path:"/"
        })
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })
      return  res.status(201).json({ message: "OK", name: user.name, email: user.email });

    } catch (error) {
        console.log(error)
       return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}
export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({message:"User not registered"})
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(403).json({ message: "Incorrect Password" })
        }
        console.log(": ", isPasswordCorrect);
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path:"/"
        })
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed:true
        })
        res.status(201).json({ message: "OK", name: user.name, email: user.email });

    } catch (error) {
        console.log(error)
        res.status(200).json({ message: "ERROR", cause: error.message });
    }
}