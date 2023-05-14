import { useState, useEffect } from "react";
import MessageList from "../components/messageList";
import { Container, Box, Typography, TextField } from "@mui/material";
import styles from "@/styles/Chat.module.css";
import Channel from "../components/Channel";
import ChatBox from "../components/ChatBox";
import Header from "@/components/header";
import Sidebarv2 from "@/components/Sidebar2";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(false);
  const [channel, setChannels] = useState([]);
  const [search, setSearch] = useState("");

  const retrievedUserId = Cookies.get("user_id");
  console.log(retrievedUserId);

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
    const retrievedUserId = Cookies.get("user_id");

    return fetch(`/api/viewchat?user_id=${retrievedUserId}`, requestOptions)
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
            latestMessage: res[c].latest_message, // assuming you have latest_message field
          };
          channels.push(channel);
        }
        setChannels(channels);
      }
    });
  }, []);

  useEffect(() => {
    console.log(channel);
  }, [channel]);

  const sendMessage = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("senderId", retrievedUserId);
    urlencoded.append("recipientId", selectedChannel.id);
    urlencoded.append("content", inputMessage);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("/api/message", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        // Add the new message to the messages state
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender_id: retrievedUserId,
            recipientId: selectedChannel.id,
            content: inputMessage,
          },
        ]);
      })
      .catch((error) => console.log("error", error));

    setInputMessage("");
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    fetch(`/api/message?group_id=${channel.id}`)
      .then((response) => response.json())
      .then((result) => {
        setMessages(result.result);
      })
      .catch((error) => console.log("error", error));
  };

  // ... (rest of the code)

  return (
    <div className={styles.chatContainer}>
      <Header />
      <Sidebarv2 />
      <div className={styles.mainContent}>
        <Container maxWidth="lg" sx={{ display: "flex" }}>
          <Box flexGrow={1} className={styles.chatList}>
            <TextField
              id="chatSearch"
              label="Chat Search"
              variant="outlined"
              sx={{ mt: "120px", mb: "5px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {channel
              .filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((channel) => (
                <Channel
                  key={channel.id}
                  title={channel.name}
                  latestMessage={channel.latestMessage}
                  onClick={() => handleChannelSelect(channel)}
                />
              ))}
          </Box>
          <Box
            flexGrow={1}
            className={styles.chatBox}
            sx={{
              position: "fixed",
              right: "-100px",
              bottom: "16px",
              overflowY: "scroll", // Make the chatbox scrollable
              height: "calc(100vh - 120px)", // Set the height relative to the viewport height
            }}
          >
            {selectedChannel && (
              <ChatBox
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                currentUser={"1"}
                currentChat={selectedChannel.id}
              />
            )}
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Chat;
