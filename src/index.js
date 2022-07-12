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
    socket.on('joinRoom', (data) => {
        console.log('join room', data);
        socket.join(data);
    });
    socket.on('sendMessage', (data) => {
        console.log('requestSendMessage: ', data);
        socketIo.to(data.idRoom).emit('message', data);
    });

    // socket.emit('getId', socket.id);

    // socket.on('sendDataClient', function (data) {
    //     console.log(data);
    //     socketIo.emit('sendDataServer', { data });
    // });

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
