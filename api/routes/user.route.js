import express from "express";
import userController from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";
import multer from "multer";

const userRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where you want to store the uploaded files
  },
  filename: function (req, file, cb) {
    const uniquePrefix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "-";
    cb(null, uniquePrefix + file.originalname); // Prepend a unique prefix to the filename
  },
});
const upload = multer({ storage: storage });

// console.log("Route");
userRoute.get("/health", userController.health);
userRoute.post("/save", verifyUser, userController.save);
userRoute.post("/signup", userController.signUp);
userRoute.post("/login", userController.login);
userRoute.post("/upload", upload.single("file"), userController.uploadFile);

export default userRoute;
