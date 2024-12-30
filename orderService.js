import amqp from "amqplib";

async function placeOrder(order) {

    try
    {
        const connection=await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel();

        const notificationQueue = "order_notifications";
        const shippingQueue = "order_shipping";

        await channel.assertQueue(notificationQueue);
        await channel.assertQueue(shippingQueue);
        // Send messages to queues
        channel.sendToQueue(notificationQueue, Buffer.from(JSON.stringify(order)));
        console.log(`Sent order to notification queue: ${JSON.stringify(order)}`);

        channel.sendToQueue(shippingQueue, Buffer.from(JSON.stringify(order)));
        console.log(`Sent order to shipping queue: ${JSON.stringify(order)}`);

        // Close connection
        await channel.close();
        await connection.close();


    }
    catch(e)
    {
        console.log(e);
    }
    
}

export default placeOrder;