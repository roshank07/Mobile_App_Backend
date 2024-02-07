import authenticationService from "../service/authenticationService.js";
const authenticationController={
    signUp:async(req,res,next)=>{
        try{
            const{username,password,confirmPassword}=req.body;
            const response=await authenticationService.registerUser({username,password,confirmPassword});
            res.json(response);
            // console.log("request",req)

        } catch(error){
            console.log("constroller error",error);

        }

    },
    login:async(req,res,next)=>{
        try{
            const { username, password } = req.body;
            
            const response=await authenticationService.registeredUser({username,password});

            // res.cookie("authToken",response.token,{expire:360000+Date.now()});

            // res.redirect(`http://localhost:3000/profile/${response._id}`);

            if(response==="Failed")
            res.status(400).json({authToken:"username or password donot match"})
            else
            res.status(200).json({authToken:response.token,id:response._id});

        } catch(error){
            console.log("controller error in login",error);
        }

    },

    checkCookies:async(req,res,next)=>{
        const {authorization}=req.headers;
        // console.log("Inside cookies",authorization);
        const response=await authenticationService.verifyUser(authorization);
        if(response==="Failed to verify cookie")
        res.json({message:"Cookie verification failed"});
        else
        res.status(200).json({message:"Cookie verified",id:response._id});

    },

    getUser: async(req,res,next)=>{
        const {id}=req.params;
        const response=await authenticationService.getUserService(id);
        res.status(200).json(response);
    }
}
export default authenticationController;