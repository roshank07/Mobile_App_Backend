import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import cookie from "cookie";
import JsonWebToken from "jsonwebtoken";
const authenticationService={
    registerUser:async(requestBody)=>{

        try{
            const {username,password,confirmPassword}=requestBody;
            const user=new User(
                {
                    user_name:username,
                    password:password,
                    confirm_password:confirmPassword
                })
            const response=await user.save();
            console.log(response);
            return response;

        } catch(error){
            console.log("inside service_error",error);
        }

    },

    registeredUser:async(requestBody)=>{
        try{
            const { username, password } = requestBody;

            // Find the user in the dummy database
            const userData = await User.findOne({ user_name:username });

            if(userData){
                const PasswordVerify=bcrypt.compareSync(password, userData.password);
                
                if(PasswordVerify){
                const token= await JsonWebToken.sign(userData.id,process.env.SECRET);
                    // res.cookie("authToken",data,{expire:360000+Date.now()});

                    userData.token=token;
                    return userData;
                }
                else
                {
                    return("Failed");
                }
            }
            else{
                return("Failed");
            }
            
    
        }   catch(error){
            console.log("login service error",error);
            return("Failed")
        }
    },

    verifyUser:async(auth)=>{
        // const {token}=auth;
        try{
        const verify=await JsonWebToken.verify(auth,process.env.SECRET);
        const userData=await User.findOne({_id:verify});
        if(userData===undefined)
        {
        return ("Failed to verify cookie");
        }
        else{
        return userData;
        }

        }catch(error){
            console.log("login service verify user error",error);
            return ("Failed to verify cookie");
        }

    },
    getUserService:async(id)=>{
        try{
            const user=await User.findOne({_id:id});
            return user;

        }
        catch(error){
            console.log("login service error",error);

        }
    }

};

export default authenticationService;