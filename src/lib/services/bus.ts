const { Kafka } = require('kafkajs');
let consumer: any = null;
let producer: any = null;

export async function getBusHandlers(msgHandler?: (msg: any) => void) {
    if(!!producer && !!consumer) {
        return [producer, consumer];
    }

    const kafka = new Kafka({
        clientId: 'news-app',
        brokers: [process.env.KAFKA_BROKER!],
    })
    
    producer = kafka.producer();
    consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID! })
    
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: process.env.KAFKA_MSG_TOPIC!, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: any) => {
            if(msgHandler) {
                msgHandler(message);
            } 
        },
    })

    return [producer, consumer];
}