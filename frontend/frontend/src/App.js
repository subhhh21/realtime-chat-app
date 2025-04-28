import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('send_message', { username, message });
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat([...chat, data]);
    });

    return () => socket.off('receive_message');
  }, [chat]);

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Enter Username</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => setIsLoggedIn(true)}>Join Chat</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Real-Time Chat</h1>
      <div style={{ marginBottom: '20px' }}>
        {chat.map((payload, index) => (
          <p key={index}><strong>{payload.username}:</strong> {payload.message}</p>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('send_message', { username, message });
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat([...chat, data]);
    });

    return () => socket.off('receive_message');
  }, [chat]);

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Enter Username</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => setIsLoggedIn(true)}>Join Chat</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Real-Time Chat</h1>
      <div style={{ marginBottom: '20px' }}>
        {chat.map((payload, index) => (
          <p key={index}><strong>{payload.username}:</strong> {payload.message}</p>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;


