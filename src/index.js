const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routerApi = require('./routes');
const mongodb = require('./configs/mongodb.config');
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Wellcome to Chat App!');
});

app.use('/api/', routerApi);

var server = require('http').createServer(app);
const socketIo = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

socketIo.on('connection', (socket) => {
    console.log('New client connected' + socket.id);
    socket.on('joinRoom', (room) => {
        console.log('join room', room);
        if (room) socket.join(room);
    });
    socket.on('leaveRoom', (room) => {
        console.log('leave room', room);
        if (room) socket.leave(room);
    });
    socket.on('sendMessage', (data) => {
        socketIo.in(data.conversation).emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

mongodb
    .config()
    .then(() => {
        server.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
