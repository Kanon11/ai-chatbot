import User from "../models/User.js";
import { hash } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const signUp = async (req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let hasPassword = await hash(password, 10);
        const user = new User({ name, email, password: hasPassword });
        await user.save();
        res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map