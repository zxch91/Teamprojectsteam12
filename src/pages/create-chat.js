import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Sidebarv2 from "@/components/Sidebar2";
import styles from "@/styles/Chat.module.css";
import TextField from "@mui/material/TextField";

export default function CreateChat() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const fetchUsers = () => {
    return fetch("/api/creategroup", requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  };

  const [users, setUsers] = useState([]);
  const [ids, setIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((res) => {
      if (res) {
        const usernames = [];
        const userIDs = [];
        for (let i = 0; i < res.result.length; i++) {
          usernames.push(res.result[i].username);
          userIDs.push(res.result[i].user_id);
        }
        setUsers(usernames);
        setIds(userIDs);
      }
    });
  });

  useEffect(() => {
    console.log(users);
    console.log(ids);
  }, [users, ids]);

  const handleCreateChat = () => {
    const chatName = document.getElementById("chatName").value;
    const chatMembers = selectedUsers.map((user) => ids[users.indexOf(user)]); // map usernames to IDs
    fetch("/api/creategroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatName, chatMembers }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", minHeight: "100vh", alignItems: "center" }}
    >
      <Sidebarv2 />
      <Box
        flexGrow={1}
        className={styles.chatContainer}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          boxShadow: 1,
          p: 2,
          minHeight: "80%",
          minWidth: "60%",
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Create Chat
        </Typography>
        <Box
          className={styles.messageList}
          sx={{
            width: "100%",
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            mb: 2,
          }}
        >
          <List>
            {console.log(users)}
            {users.map((user) => (
              <ListItem
                button
                key={user}
                onClick={() => handleUserSelection(user)}
              >
                <ListItemIcon>
                  <Checkbox checked={selectedUsers.includes(user)} />
                </ListItemIcon>
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </Box>
        <TextField
          id="chatName"
          label="Chat Name"
          variant="outlined"
          sx={{ mt: "10px", mb: "5px", width: "100%" }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleCreateChat}
          sx={{
            mt: 2,
            mb: 1,
            fontWeight: "bold",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Create Chat
        </Button>
      </Box>
    </Container>
  );
}
