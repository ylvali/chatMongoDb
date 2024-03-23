
// Express & socket
const express = require('express');
const { createServer } = require('node:http');
// const { createServer } = require('https');
const { Server } = require('socket.io');
const { join } = require('node:path');


const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// MongoDB
const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/chatBTH";

// This can be activated to activate the indexfile on
// opening the port in the browser.
// Then the index html needs to contain the css & script inline.
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// ROUTES
// Require the chat routes
const chatDb = require('./routes/chatDb');

app.use('/chat', chatDb);

// THE SOCKET IO
io.on('connection', (socket) => {
    console.log('a user connected');
    console.log('new user socket id: '+ socket.id);
    let msg1 = 'user connected';

    io.emit('user connected', msg1);

    socket.on('chat message', (msg) => {
        // console.log(socket.id);
        console.log('message: ' + msg);

        // Add msg to mongoDB
        addMsg(msg);

        // Emit msg to the socket
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log('user socket id: '+ socket.id);

        let msg1 = 'user disconnected';

        io.emit('user disconnected', msg1);
    });
});

async function addMsg(msg) {
    try {
        let thedMsg = {comment: msg};
        let res = await addToCollection(dsn, "crowd", thedMsg);

        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Add to collection : refactor from bth
 *
 * @async
 *
 * @param {string} dsn     DSN to connect to database.
 * @param {string} colName Name of collection.
 * @param {string} doc     Documents to be inserted into collection.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
async function addToCollection(dsn, colName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const result = await col.insertOne(doc);

    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
    );

    await client.close();
}

server.listen(3001, () => {
    console.log('server running at http://localhost:3001');
});
