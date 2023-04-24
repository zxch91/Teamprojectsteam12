import { useState, useEffect } from 'react';
import MessageList from '../components/messageList';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import styles from '@/styles/Chat.module.css';
import Sidebar from '../components/Sidebar';
import Channel from '../components/Channel';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    fetch('/api/messages')
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  const channels = [
    { id: 1, title: 'Channel 1' },
    { id: 2, title: 'Channel 2' },
    { id: 3, title: 'Channel 3' },
  ];


  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: { sender: 'testuser', text: inputMessage } }),
      });

      setInputMessage('');
      fetch('/api/messages')
        .then((response) => response.json())
        .then((data) => setMessages(data));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex' }}>
      <Sidebar className={styles.sidebar} />
      <Box flexGrow={1} className={styles.chatContainer} >
        <Box className={styles.channelList}>
          {channels.map((channel) => (
            <Channel key={channel.id} title={channel.title} />
          ))}
        </Box>
        {/*
        <Box className={styles.messageList}>
          <MessageList messages={messages} />
        </Box>
        <form onSubmit={sendMessage}>
          <TextField
            fullWidth
            variant="outlined"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            sx={{ marginBottom: '1rem' }}
          />
          <Button fullWidth variant="contained" type="submit">
            Send
          </Button>
        </form>
          */}
      </Box>
    </Container>
  );
}
