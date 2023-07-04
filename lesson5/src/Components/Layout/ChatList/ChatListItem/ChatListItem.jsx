import React from "react";
import ReactDOM from "react-dom/client";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import "./ChatListItem.css";

const ChatListItem = ({ text, id }) => {
  return (
    <ListItem className="chat-list__chat-list-item">
      <Link to={`/chats/${id}`}>
        <ListItemAvatar>
          <Avatar>
            <HelpOutlineIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>{text}</ListItemText>
      </Link>
    </ListItem>
  );
};
export default ChatListItem;
