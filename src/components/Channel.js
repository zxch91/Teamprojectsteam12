import { useState, useEffect } from "react";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Channel = ({ title, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        width: "100%",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-4px)",
          backgroundColor: "#f0f0f0",
        },
      }}
      variant="outlined"
    >
      <CardContent sx={{ padding: "24px" }}>
        <Typography
          variant="h6"
          component="h2"
          align="left"
          sx={{
            fontWeight: "bold",
            color: "#212121",
            marginBottom: "10px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          align="left"
          sx={{
            color: "#666666",
            fontFamily: "'Roboto', sans-serif",
            lineHeight: "1.6",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rhoncus urna non augue convallis ultrices.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Channel;
