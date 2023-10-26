import { signUpValidator, validate } from '../utils/validators.js';
import { Router } from "express";
import { getAllUsers, signUp } from "../controllers/user-controller.js";
const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup",validate(signUpValidator),signUp)

 export default userRoutes;