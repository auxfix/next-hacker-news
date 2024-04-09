const express = require('express');
const next = require('next');
const { Kafka } = require('kafkajs');

let consumer = null;
let producer = null;

async function getBusHandlers(msgHandler) {
    if(!!producer && !!consumer) {
        return [producer, consumer];
    }

    const kafka = new Kafka({
        clientId: 'news-app',
        brokers: [process.env.KAFKA_BROKER],
    })
    
    producer = kafka.producer();
    consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID })
    
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: process.env.KAFKA_MSG_TOPIC, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if(msgHandler) {
                msgHandler(message);
            } 
        },
    })

    return [producer, consumer];
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require('http');
const socketIO = require('socket.io');

app.prepare().then(async () => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIO(httpServer);

    io.on('connection', async (socket) => {
        console.log('Client connected');

        await getBusHandlers((msg) => {
            console.log(`Server::Kafka --> Socket::${msg}`);
            socket.emit('out', msg);
        })     
    });

    io.on('in', async (msg) => {
        console.log(`Server::Socket --> Kafka::${msg}`);

        const [producer] = await getBusHandlers();
        
        producer.produce(
            process.env.KAFKA_MSG_TOPIC, 
            null,
            Buffer.from(msg),
            null,
            Date.now()
        );
    });



    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});