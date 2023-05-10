import { useState, useEffect } from "react";
import MessageList from "../components/messageList";
import { Container, Box, Typography, TextField } from "@mui/material";
import styles from "@/styles/Chat.module.css";
import Sidebar2 from "@/components/Sidebar2";
import Channel from "../components/Channel";
import ChatBox from "../components/ChatBox";
import Header from "@/components/header";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(false);
  const [channel, setChannels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchChannels = () => {
    return fetch("api/viewchat", requestOptions)
      .then((response) => response.json())
      .then((result) => result.result) // extract channels from result property
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchChannels().then((res) => {
      if (res) {
        const channels = [];
        for (const c in res) {
          const channel = {
            id: res[c].group_id,
            name: res[c].group_name,
          };
          channels.push(channel);
        }
        setChannels(channels);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      fetch(`/api/message?channel=${selectedChannel.id}`)
        .then((response) => response.json())
        .then((data) => setMessages(data));
    }
  }, [selectedChannel]);

  useEffect(() => {
    console.log(channel);
  }, [channel]);

  const fetchMessages = async (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("group_id", selectedChannel.id);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/message", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("senderId", "1");
    urlencoded.append("recipientId", selectedChannel.id);
    urlencoded.append("content", inputMessage);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/message", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setInputMessage("");
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/api/message?group_id=" + channel.id, requestOptions)
      .then(response => response.text())  
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  

  return (
    <div className={styles.pageContainer}>
      <div>
        <Header />
      </div>
      <Container maxWidth="lg" sx={{ display: 'flex' }}>
        <Box sx={{ width: '25%' }}>
          <TextField
            id="chatSearch"
            label="Chat Search"
            variant="outlined"
            sx={{ mt: '10px', mb: '5px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {channel
            .filter((channel) =>
              channel.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((channel) => (
              <Channel
                key={channel.id}
                title={channel.name}
                onClick={() => handleChannelSelect(channel)}
              />
            ))}
        </Box>
        <Box sx={{ width: '75%' }}>
          {selectedChannel && (
            <ChatBox
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              sendMessage={sendMessage}
              currentUser={'1'}
              currentChat={selectedChannel.id}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};
