#!/usr/bin/env node
const server = require('../client/start.js')

var io = require('socket.io')(server);

const users = new Map()

io.on('connection', (socket) => {
    
  console.log('a user connected');
    socket.on('/sweet/viewer/init', (msg)=>{
        let nbr;
        if(users.has(msg.file)){
            let entry = users.get(msg.file)
            entry.push(socket.id)
            console.log('after adding ')
            console.log('entry')
            console.log(entry)
            console.log('users')
            console.log(users)
        }else{
            users.set(msg.file, [socket.id])
        }
        nbr = users.get(msg.file).length
/*        users[msg.file] = {
            nbr: (nbr = (users[msg.file] != null ? users[msg.file]['nbr'] | 0 : 0) + 1),
            sockets: nbr == 1 ? [] : users[msg.file].sockets
        }
        users[msg.file].sockets.push(socket.id)
*/
        console.log('nbr = '+nbr)

        console.log(users)
        io.emit('/sweet/viewer/new?'+msg.file, {data: nbr})
    })
    socket.on('/sweet/viewer/position', (msg) => {
        //console.log('New position from '+socket.id)
        io.emit('/sweet/viewer/position?'+msg.file, {data: msg.data})
        //console.log(msg)

    })
    socket.on('/sweet/viewer/page', (msg) => {
        //console.log('New Page received from '+socket.id)
        io.emit('/sweet/viewer/page?'+msg.file, {data: msg.data})
        //console.log(msg)

    })

    socket.on('disconnect', () => {
        console.log('disconnect')
        let keys = users.keys()
        while(true){
            let entry = keys.next().value
            console.log('entry = ')
            console.log(entry)
            console.log(users.get(entry))
            let index = -1
            if((index = users.get(entry).indexOf(socket.id)) >= 0){
                users.get(entry).splice(index, 1)
                io.emit('/sweet/viewer/new?'+entry, {data: users.get(entry).length})
                if(users.get(entry).length == 0){
                    console.log('has entry = '+users.has(entry))
                    users.delete(entry)
                    console.log(users)
                    console.log("has file = "+users.has(entry))
                }
                break;
            }
        }
        console.log("Map Reduice")
        console.log(users)

        

        
    });
});


server.listen(process.env.port || 9999, () => {

    console.log(`Running at Port ${process.env.port || 9999}`);
});