import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const Sidebar = () => {
    const handleViewChats = () => {
      // Add code to handle view chats functionality
    };
  
    const handleCreateChat = () => {
      // Add code to handle create chat functionality
    };
  
    const handleDeleteChat = () => {
      // Add code to handle delete chat functionality
    };
  
    return (
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button onClick={handleViewChats}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="View Chats" />
          </ListItem>
          <ListItem button onClick={handleCreateChat}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Chat" />
          </ListItem>
          <ListItem button onClick={handleDeleteChat}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Chat" />
          </ListItem>
        </List>
      </Drawer>
    );
  };
  
  export default Sidebar;
  