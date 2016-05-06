import io from 'socket.io-client';

export function connectToWebSockets(){
  return (process.env.NODE_ENV === 'production')? io().connect('https://in-class.herokuapp.com'): io().connect('http://localhost:8000');
}



