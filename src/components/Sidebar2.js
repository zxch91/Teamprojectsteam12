import React from "react";
import { useRouter } from "next/router";
import router from "next/router";
import CreateChat from "@/pages/create-chat";

function Sidebarv2() {

  const navigateToViewChats = () => {
    router.push('/chat2');
  };

  const navigateToCreateChat = () => {
    router.push('/create-chat');
  };

  const styles = {
    sidebar: {
      backgroundColor: "#f8f8f8",
      width: "200px",
      height: "100%",
      position: "fixed",
      top: "120px",
      left: 0,
      padding: "20px",
      boxSizing: "border-box",
    },


    button: {
      display: "block",
      width: "100%",
      marginBottom: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },

    viewChats: {
      backgroundColor: "#f8f8f8",
      color: "#007bff",
    },

    viewChatsHover: {
      backgroundColor: "#f1f1f1",
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebar}>
        <button style={styles.button} onClick={navigateToCreateChat}>Create a Chat</button>
        <button style={{ ...styles.button, ...styles.viewChats, ":hover": styles.viewChatsHover }} onClick={navigateToViewChats}>
          View Chats
        </button>
      </div>
    </div>
  );
}

export default Sidebarv2;
