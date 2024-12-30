import amqp from 'amqplib';
async function consumerMessages(queueName) {
    try
    {
        const connection = await amqp.connect("amqp://guest:guest@localhost")
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName,{durable:true})
                console.log(`Waiting for messages in queue: "${queueName}"`);

                channel.consume(
                    queueName,
                    (message)=>{
                        if(message)
                        {
                             console.log(
                               `Received message: ${message.content.toString()}`
                             );
                             channel.ack(message)
                        }
                    },{noAck:false}
                )

    }
    catch(e)
    {
         console.error("Error consuming messages:", error);
    }
}

export default consumerMessages;