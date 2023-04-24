import { useState, useEffect } from "react";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Channel = ({ title }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "10px auto",
        cursor: "pointer",
        backgroundColor: "#f5f5f5",
        transition: "transform 0.2s",
        boxShadow: "none",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0 5px 0px rgba(0, 0, 0, 0.2)",
        },
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ fontWeight: "bold", color: "#212121" }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Channel;
    