import amqp from "amqplib";

let channel , connection;

async function connectRabbitMQ() {
    try{
        connection = await amqp.connect("amqp://guest:guest@localhost");
        channel=await connection.createChannel();
        console.log('Connected to RabbitMq');
    }
    catch(e)
    {
        console.error("Error connecting to RabbitMQ:", e)

    }
}

async function publishMessage(queueName,message){
    if(!channel)
    {
        console.log("RabbitMQ channel not intiailized");
        return;
    }
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName,Buffer.from(message))
    console.log("message sent to queue")
}
async function closeRabbitMQ() {
    await channel.close();
    await connection.close();
}

export  { connectRabbitMQ , publishMessage,closeRabbitMQ}