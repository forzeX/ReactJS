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
import { deleteChat, toggleVisibility } from "../../../../Store/chats/actions";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "react-responsive";

const ChatListItem = ({ text, id }) => {
  const chatsWithNewMessages = useSelector(
    (state) => state.chats.haveNewMessages
  );

  const hasNewMessages = (chatId) => {
    return chatsWithNewMessages.includes(chatId);
  };

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteChat(id));
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1079px)" });
  const isActive = useSelector((state) => state.chats.isActive);

  const handleLinkClick = (e) => {
    if (isMobile & isActive) {
      dispatch(toggleVisibility());
    }
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
        <ListItemText onClick={handleLinkClick}>{text}</ListItemText>
        <Button onClick={handleClick}>
          <DeleteIcon></DeleteIcon>
        </Button>
      </Link>
    </ListItem>
  );
};
export default ChatListItem;
