import io from 'socket.io-client';

export var socket = (process.env.NODE_ENV === 'production')? io().connect('https://in-class.herokuapp.com'): io().connect('http://localhost:8000');
