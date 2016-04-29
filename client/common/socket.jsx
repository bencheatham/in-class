import socket from 'socket.io-client';

export var socket = socket().connect('http://localhost:8000');