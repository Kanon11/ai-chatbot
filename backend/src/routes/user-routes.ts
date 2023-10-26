import { signUpValidator, logInValidator, validate } from '../utils/validators.js';
import { Router } from "express";
import { getAllUsers, signUp,logIn } from "../controllers/user-controller.js";
const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup",validate(signUpValidator),signUp)
userRoutes.post("/login", validate(logInValidator), logIn)

 export default userRoutes;