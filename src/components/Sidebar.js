import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 240px;
    background-color: #f5f5f5;
    margin-top: 130px;
  }
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: #e0e0e0;
  }
`;

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
      <StyledDrawer variant="permanent" anchor="left">
        <List>
          <StyledListItem button onClick={navigateToViewChats}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="View Chats" />
          </StyledListItem>
          <StyledListItem button onClick={navigateToCreateChat}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Chat" />
          </StyledListItem>
        </List>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;