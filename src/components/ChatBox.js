import { Box, TextField, Button } from "@mui/material";
import MessageList from "./messageList";
import styles from "@/styles/Chat.module.css";
import Cookies from "js-cookie";

const ChatBox = ({ messages, inputMessage, setInputMessage, sendMessage }) => {
  const currentUser = Cookies.get("user_id");

  console.log(messages);

  const messageArray =
    messages && Array.isArray(messages)
      ? messages.map((message) => ({
          text: message.content,
          sender: message.sender_id.toString(),
          person: message.username,
        }))
      : [];

  console.log(messageArray);

  return (
    <Box
      sx={{
        backgroundColor: "#F6F6F6",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)",
        padding: "16px",
      }}
    >
      <Box className={styles.messageList}>
        <MessageList messages={messageArray} currentUser={currentUser} />
      </Box>
      <form onSubmit={sendMessage}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#ffffff",
            borderRadius: "4px",
          }}
          InputProps={{
            style: {
              padding: "12px",
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#4A154B",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#6e1a6e",
            },
          }}
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ChatBox;
