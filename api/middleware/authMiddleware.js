const checkIfAuthMiddlewareExists=async(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        const verify=await JsonWebToken.verify(authorization,process.env.SECRET);
        await User.findOne({_id:verify});
        next();

    }catch(error){
            console.log("middleware error",error);
            return ("Middleware Error");
    }
}
export default checkIfAuthMiddlewareExists;