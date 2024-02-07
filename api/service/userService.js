import userModel from "../models/userModel.js"

const userService={
    getAllUsersService:async (query)=>{
        const response= await userModel.find({});
        console.log(response);
        return response;

    },
    postUserService:async(userData)=>{
        try {
            const{name,surname,email,phone,password}=userData;

            const newUser = new userModel({
                first_name: name,
                last_name: surname,
                email_id: email,
                phone_number: phone,
                password: password
            });
            const savedUser = await newUser.save();
            console.log(savedUser);
            return savedUser;
        } catch (error) {
            console.error(error);
            throw error; // Handle the error appropriately in your application
        }

    },
    putUserService:async(userId,updatedData)=>{
        try{

            const {name,surname}=updatedData;
            const updatedUser= await userModel.findByIdAndUpdate(userId,
                {$set: {

                    first_name:name,
                    last_name:surname,
                }},
                { new : true}

                );
            console.log(updatedUser);
            return updatedUser;
        } catch(error){

            console.error(error);
            throw error;

        }

    },
    patchUserService:async (userId,updatedData)=>{
        try{
            const {email}=updatedData;
            const updatedUser= await userModel.findByIdAndUpdate(userId,
                { $set : {email_id:email} },
                { new : true}

                );
             console.log(updatedUser);
            return updatedUser;
        } catch(error){

            console.error(error);
            throw error;

        }

    },
    deleteUserService:async(userId)=>{

        try{
            const updatedUser= await userModel.findByIdAndDelete(userId);
            console.log("successfully deleted",userId);
            return updatedUser;
        } catch(error){

            console.error(error);
            throw error;

        }


    },
};

export default userService;