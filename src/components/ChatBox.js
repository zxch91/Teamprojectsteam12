import { Box, TextField, Button } from "@mui/material";
import MessageList from "./messageList";
import styles from "@/styles/Chat.module.css";

const ChatBox = ({ messages, inputMessage, setInputMessage, sendMessage }) => {
  console.log(messages);

  const contentArray =
    messages && Array.isArray(messages)
      ? messages.map((message) => message.content)
      : [];

  console.log(contentArray);

  return (
    <>
      <Box className={styles.messageList}>
        <MessageList messages={contentArray} />
      </Box>
      <form onSubmit={sendMessage}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <Button fullWidth variant="contained" type="submit">
          Send
        </Button>
      </form>
    </>
  );
};

export default ChatBox;
