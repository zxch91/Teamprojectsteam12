import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sidebar from '../components/Sidebar';
import styles from '@/styles/Chat.module.css';

export default function CreateChat() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/api/creategroup", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCreateChat = () => {
    
  };

  const handleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex' }}>
      <Sidebar className={styles.sidebar} />
      <Box flexGrow={1} className={styles.chatContainer}>
        <Typography variant="h4" gutterBottom>
          Create Chat
        </Typography>
        <Box className={styles.messageList}>
          <List>
            {users.map((user) => (
              <ListItem button key={user} onClick={() => handleUserSelection(user)}>
                <ListItemIcon>
                  <Checkbox checked={selectedUsers.includes(user)} />
                </ListItemIcon>
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Button fullWidth variant="contained" onClick={handleCreateChat}>
          Create Chat
        </Button>
      </Box>
    </Container>
  );
}
