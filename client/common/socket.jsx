var socket = require('socket.io/node_modules/socket.io-client');

import socket from 'socket.io-client';
socket().connect('http://localhost:8000');
export {socket};
