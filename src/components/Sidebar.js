 import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const navigateToViewChats = () => {
    router.push('/chat');
  };

  const navigateToCreateChat = () => {
    router.push('/create-chat');
  };

  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem button onClick={navigateToViewChats}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="View Chats" />
          </ListItem>
          <ListItem button onClick={navigateToCreateChat}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Chat" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
