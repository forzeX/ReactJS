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
import { useDispatch, useSelector } from "react-redux";
import { deleteChat } from "../../../../Store/chats/actions";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatListItem = ({ text, id }) => {
  const chatsWithNewMessages = useSelector(
    (state) => state.chats.haveNewMessages
  );

  const hasNewMessages = (chatId) => {
    return chatsWithNewMessages.includes(chatId);
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(id);
    dispatch(deleteChat(id));
  };

  return (
    <ListItem
      className={
        `chat-list__chat-list-item` + (hasNewMessages(id) ? ` new-message` : ``)
      }
    >
      <Link to={`/chats/${id}`}>
        <ListItemAvatar>
          <Avatar>
            <HelpOutlineIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>{text}</ListItemText>
        <Button onClick={handleClick}>
          <DeleteIcon></DeleteIcon>
        </Button>
      </Link>
    </ListItem>
  );
};
export default ChatListItem;
