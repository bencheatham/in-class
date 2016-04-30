
import socket from 'socket.io-client';
if (process.env.NODE_ENV === 'production') {var io = socket().connect('https://in-class.herokuapp.com');}
else {var io = socket().connect('http://localhost:8000');}

export {io};

