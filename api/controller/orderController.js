import orderService from "../service/orderService.js";
const orderController={
    createOrder:async(req,res,next)=>{
        try{
            const{price,productId}=req.body;
            // console.log(price);
            const response=await orderService.createOrderService({price,productId});
            if(response=="Failed")
            res.status(500).send("Error");

            else
            res.status(200).json(response);
            // console.log("request",req)

        } catch(error){
            console.log("constroller error",error);
            res.status(500).send("Error");

        }

    },
    verifyOrder:async(req,res,next)=>{
        try{
            const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
            // console.log(price);
            const response=await orderService.verifyOrderService({razorpay_payment_id,razorpay_order_id,razorpay_signature});
            // console.log(response);
            if(response=="Failed")
            res.status(500).json({msg:"Failed to verify"});

            else
            res.status(200).json({msg:"success",orderId:razorpay_order_id,paymentId:razorpay_payment_id});
            // console.log("request",req)

        } catch(error){
            console.log("controller error",error);
            res.status(500).json({msg:"Server error occured"});

        }


    },
};

export default orderController;