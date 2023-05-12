import { List, ListItem, Avatar } from "@mui/material";
import styles from "@/styles/Message.module.css";
import Cookies from "js-cookie";

function MessageList({ messages, currentUser }) {
  console.log(currentUser);
  console.log(messages);

  if (!Array.isArray(messages)) {
    return null; // or handle the error in some other way
  }

  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index}>
          <div
            className={`${styles.messageWrapper} ${
              message.sender === currentUser ? styles.sender : ""
            }`}
          >
            <Avatar className={styles.avatar}>
              {message.person
                ? message.person.substring(0, 2).toUpperCase()
                : ""}
            </Avatar>
            <span className={styles.messageItem}>{message.text || ""}</span>
          </div>
        </ListItem>
      ))}
    </List>
  );
}

export default MessageList;
