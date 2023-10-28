import axios from "axios";

export const logInUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = res.data;
    return data;
}
export const signUpUser = async (name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", { name, email, password });
    if (res.status !== 201) {
        throw new Error("Unable to SignUp");
    }
    const data = res.data;
    return data;
}
export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};
export const logOutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status!==200) {
        throw new Error("Unable to logout");
    }
    const data = await res.data;
    return data;

}