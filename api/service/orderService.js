import razorpay from "razorpay";
import { v4 as uuidV4 } from "uuid";
import crypto from "crypto";
const orderService={
    createOrderService:async(requestBody)=>{
           const {price,productId}=requestBody;
           const instance=new razorpay({
            key_id:process.env.key_id,
            key_secret:process.env.key_secret
           });
           const receiptID=uuidV4();
           try{
           const data=await instance.orders.create({
            amount:price,
            currency:"INR",
            receipt: receiptID,
            payment_capture: true 
           })
           if(!data)
           return ("Failed");

           return data;
           }catch(error){
            console.log("Inside service",error);
            return ("Failed");
           }
    },

    verifyOrderService:async (requestBody) => {
        try {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = requestBody;
      
          const sha = crypto.createHmac("sha256", process.env.key_secret);
          sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
          const digest = sha.digest("hex");
      
          if (digest !== razorpay_signature) {
            return "Failed";
          }
      
          return ("Success");
        } catch (error) {
          console.log("In service", error);
          return "Failed";
        }
      },
};

export default orderService;