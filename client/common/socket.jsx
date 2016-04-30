import socket from 'socket.io-client';
if (process.env.NODE_ENV === 'production') socket().connect('http://in-class.herokuapp.com');
else socket().connect('http://localhost:8000');

export {socket};
