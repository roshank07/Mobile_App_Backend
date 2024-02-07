import orderController from "../controller/orderController.js";

const orderRoutes=(app)=>{
    app.post("/api/createOrder",orderController.createOrder);
    app.post("/api/verifyOrder",orderController.verifyOrder);
  

};
export default orderRoutes;