import { List, ListItem } from '@mui/material';
import styles from '@/styles/Message.module.css';

function MessageList({ messages }) {
  const currentUser = 'testuser'; // change later - can route logged in user 

  if (!Array.isArray(messages)) {
    return null; // or handle the error in some other way
  }

  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index}>
          <div
            className={`${styles.messageWrapper} ${
              message.sender === currentUser ? styles.sender : ''
            }`}
          >
            <span className={styles.messageItem}>{message.text}</span>
          </div>
        </ListItem>
      ))}
    </List>
  );
}

export default MessageList;
