import amqp from "amqplib";

async function processNotifications() {

    try {
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      const queue = "order_notifications";
      console.log(`Waiting for messages in ${queue}...`);

      // Process messages
      channel.consume(queue, (message) => {
        const order = JSON.parse(message.content.toString());
        console.log(
          `Sending email for order: ${order.orderId} to ${order.user}`
        );

        // Acknowledge message
        channel.ack(message);
      });
    } catch (error) {
      console.error("Error processing notifications:", error);
    }
    
}
export default processNotifications