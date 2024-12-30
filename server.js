import bodyParser from "body-parser";
import express from "express";
import { connectRabbitMQ, publishMessage } from "./rabbitmq.js";
import consumerMessages from "./consumer.js";
import placeOrder from "./orderService.js";
import processNotifications from "./notificationService.js";
import processShipping from "./shippingService.js";

const app = express();
app.use(bodyParser.json())


connectRabbitMQ();


app.post('/send-message',async(req,res)=>{
    const{queueName,message}=req.body;
    try {
      await publishMessage(queueName, message);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
})

app.get('/get-message',(req,res)=>{
    const message=req.body.queueName;
    console.log(message)
    consumerMessages(message);
})

app.post("/place-order",(req,res)=>{
  const order = req.body;
  placeOrder(order);
})

app.get("/get-notification",(req,res)=>{
  processNotifications()
})
app.get("/get-shipping",(req,res)=>{
  processShipping();
})


app.listen(3000,()=>{
    console.log("port listening ")
})