import express from "express";
import userController from "../controller/userController.js"
const userRoutes=(app)=>{
    app.get("/api/users",userController.getUsers);
    app.post("/api/createUser",userController.postUsers);
    app.put("/api/updateUser/:userId",userController.putUsers);
    app.patch("/api/updateUserByKey/:userId",userController.patchUsers);
    app.delete("/api/deleteUser/:userId",userController.deleteUsers);

};
export default userRoutes;