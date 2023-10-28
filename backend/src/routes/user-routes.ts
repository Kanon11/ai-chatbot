import { signUpValidator, logInValidator, validate } from '../utils/validators.js';
import { Router } from "express";
import { getAllUsers, signUp, logIn, verifyUser,userLogOut } from "../controllers/user-controller.js";
import { verifyToken } from '../utils/token-manager.js';
const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup",validate(signUpValidator),signUp)
userRoutes.post("/login", validate(logInValidator), logIn)
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogOut);

 export default userRoutes;