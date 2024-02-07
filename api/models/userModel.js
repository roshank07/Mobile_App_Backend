import mongoose from "mongoose";
const Schema=mongoose.Schema;

const UsersSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
});


const User=mongoose.model("Users",UsersSchema);
export default User;
