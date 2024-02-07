import userService from "../service/userService.js";
const userController={
    getUsers: async (req,res,next)=>{
        const { query }=req;
        const response=await userService.getAllUsersService(query);
        res.json(response);
    },
    postUsers:async(req,res,next)=>{
        try {
            const userData = req.body; // Assuming you're sending user data in the request body
            const response = await userService.postUserService(userData);
            res.status(201).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" }); // Handle errors appropriately
        }
    },
    putUsers:async(req,res,next)=>{ //multiplecolumn
        try {
            const userId=req.params.userId;
            const updatedData=req.body;
            const response=await userService.putUserService(userId,updatedData);
            res.json(response);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error"});
        }
    },
    patchUsers:async(req,res,next)=>{ //singlecolumn
        try {
            const userId=req.params.userId;
            const updatedData=req.body;
            const response=await userService.patchUserService(userId,updatedData);
            res.json(response);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error"});
        }
    },
    deleteUsers:async(req,res,next)=>{
        try {
            const userId=req.params.userId;
            const response=await userService.deleteUserService(userId);
            res.json({message:`successfully deleted user ${userId}`});

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error"});
        }
    },

};

export default userController;