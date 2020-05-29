#!/usr/bin/env node
const server = require('../client/start.js')

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    
  console.log('a user connected');
    console.log('Socket id = '+socket.id+" room = "+JSON.stringify(socket.rooms));
    socket.on('/sweet/viewer', (msg)=>{
        console.log('New message '+JSON.stringify(msg));
        
    })
    socket.on('/sweet/viewer/position', (msg) => {
        console.log('New position from '+socket.id)
        io.emit('/sweet/viewer/position?'+msg.file, {data: msg.data})
        console.log(msg)

    })
    socket.on('/sweet/viewer/page', (msg) => {
        console.log('New Page received from '+socket.id)
        io.emit('/sweet/viewer/page?'+msg.file, {data: msg.data})
        console.log(msg)

    })

    socket.on('disconnect', () => {
        console.log('user disconnected');

    });
});


server.listen(process.env.port || 8080, () => {

    console.log('Running at Port 8080');
});