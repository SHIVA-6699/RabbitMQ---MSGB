import amqp from "amqplib";

async function processShipping() {
    try {
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      const queue = "order_shipping";
      await channel.assertQueue(queue);

      console.log(`Waiting for messages in ${queue}...`);

      // Process messages
      channel.consume(queue, (message) => {
        const order = JSON.parse(message.content.toString());
        console.log(
          `Preparing shipping for order: ${
            order.orderId
          }, Items: ${order.items.join(", ")}`
        );

        // Acknowledge message
        channel.ack(message);
      });
    } catch (error) {
      console.error("Error processing shipping:", error);
    }

}

export default processShipping;