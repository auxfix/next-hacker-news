const express = require('express');
const next = require('next');
const { Kafka } = require('kafkajs');

let consumer = null;
let producer = null;

async function getBusHandlers() {
    if(!!producer && !!consumer) {
        return await Promise.resolve([producer, consumer]);
    }

    const kafka = new Kafka({
        clientId: 'news-app',
        brokers: [process.env.KAFKA_BROKER],
        ssl: true,
        sasl: {
          mechanism: 'SCRAM-SHA-512',
          username: process.env.KAFKA_USER,
          password: process.env.KAFKA_PASSWORD
        },
    })
    
    producer = kafka.producer();
    consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID })
    
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: process.env.KAFKA_MSG_TOPIC, fromBeginning: true });

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

        const [_, consumer]  = await getBusHandlers();

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const msg = message.value.toString()
                console.log(`Server::Socket <-- Kafka::${msg}`);
                io.emit('inform_client', msg); 
            },
        })
        
        socket.on('inform_server', async (msg) => {
            console.log(`Server::Socket --> Kafka::${msg}`);
    
            const [producer] = await getBusHandlers();

            await producer.send({
                topic: process.env.KAFKA_MSG_TOPIC,
                messages: [
                  { value: msg },
                ],
            })
        });
    });





    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});