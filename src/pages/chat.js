import { useState, useEffect } from 'react';
import MessageList from '../components/messageList';
import { Container, Box, Typography, TextField } from '@mui/material';
import styles from '@/styles/Chat.module.css';
import Sidebar from '../components/Sidebar';
import Channel from '../components/Channel';
import ChatBox from '../components/ChatBox';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    fetch(`/api/messages?channel=${channel.id}`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
      console.log(channel.id);
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex' }}>
      <Sidebar className={styles.sidebar} />
      <Box flexGrow={0} width={200}>
        <TextField id="chatSearch" label="Chat Search" variant="outlined" sx={{mt: "10px", mb:"5px"}} />
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            title={channel.title}
            onClick={() => handleChannelSelect(channel)}
          />
        ))}
      </Box>
      <Box flexGrow={1} className={styles.chatContainer}>
        {selectedChannel && (
          <ChatBox
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            sendMessage={sendMessage}
          />
        )}
      </Box>
    </Container>
  );
}
