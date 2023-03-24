import { useState, useEffect } from 'react';
import MessageList from '../components/MessageList';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import styles from '@/styles/Chat.module.css';
import Sidebar from '../components/Sidebar';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    fetch('/api/messages')
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

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
      <Box flexGrow={1} className={styles.chatContainer}>
        <Typography variant="h4" gutterBottom>
          Chat App
        </Typography>
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
      </Box>
    </Container>
  );
}
