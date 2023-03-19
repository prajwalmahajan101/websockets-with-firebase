require("dotenv").config();
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const Users = require("./firebase-coonection");


const wss = new WebSocket.Server({ server:server });


wss.on('connection', async function connection(ws) {
    console.log('A new client Connected!');

    let snapshot =await Users.get();
    let data = snapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
    ws.send('Welcome New Client!');
    ws.send(JSON.stringify({data:data}));
  
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
  
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
      
    });
});

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(3000, () => console.log(`Lisening on port :3000`))