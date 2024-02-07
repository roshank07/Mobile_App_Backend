import authenticationController from "../controller/authenticationController.js";
import checkIfAuthMiddlewareExists from "../middleware/authMiddleware.js";

const authenticationRoutes =(app)=>{
    app.post("/api/login/user",authenticationController.login);
    app.post("/api/signup/user",authenticationController.signUp);
    app.get("/api/user/auth/check",authenticationController.checkCookies);
    // app.get("/users/:id",checkIfAuthMiddlewareExists,authenticationController.getUser);
};

export default authenticationRoutes;