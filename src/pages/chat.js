import { useState, useEffect } from 'react';
import MessageList from '../components/messageList';
import { Container, Box, Typography, TextField } from '@mui/material';
import styles from '@/styles/Chat.module.css';
import Sidebar from '../components/Sidebar';
import Channel from '../components/Channel';
import ChatBox from '../components/ChatBox';
import Header from '@/components/header';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(false);
  const [channel, setChannels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/message')
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  const channels = [
    { id: 1, title: 'Channel 1' },
    { id: 2, title: 'Channel 2' },
    { id: 3, title: 'Channel 3' },
  ];

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const fetchChannels = () => {
    return fetch("api/viewchat", requestOptions)
      .then(response => response.json())
      .then(result => result.result) // extract channels from result property
      .catch(error => console.log('error', error));
  }
  

  useEffect(() => {
    fetchChannels().then((res) => {
      if (res) {
        const channels = []
        for (const c in res) {
          const channel = {
            id : res[c].group_id,
            name: res[c].group_name
          }
          channels.push(channel);
        }
        setChannels(channels)
      }
    })
  }, []);
  

  useEffect(() => {
    console.log(channel);
  }, [channel]);


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
    <div className = {styles.pageContainer}>
    <div><Header/></div>
    <Container maxWidth="lg" sx={{ display: 'flex' }}>
      <Sidebar className={styles.sidebar} />
      <Box flexGrow={0} width={200}>
        <TextField id="chatSearch" label="Chat Search" variant="outlined" sx={{mt: "10px", mb:"5px"}} />
        {channel.map((channel) => (
          <Channel
            key={channel.id}
            title={channel.name}
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
    </div>
  );
}