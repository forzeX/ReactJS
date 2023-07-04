import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../../Store/chats/actions";
import { showAddChatBar } from "../../../Store/chats/actions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// const AddChatBar = () => {
//   const [value, setValue] = useState("");

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   const chatsStorage = useSelector((state) => state.chatsStorage);
//   const dispatch = useDispatch();

//   const handleSubmit = () => {
//     dispatch(addChat(value));
//     setValue("");
//   };

//   return (
//     <TextField value={value} onChange={handleChange} onSubmit={handleSubmit} />
//   );
// };

const AddChatBar = () => {
  const open = useSelector((state) => state.chats.showModal);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showAddChatBar());
  };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    dispatch(showAddChatBar());
  };

  const handleCreate = () => {
    dispatch(addChat({ name: value, id: window.crypto.randomUUID() }));
    dispatch(showAddChatBar());
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Новый чат</DialogTitle>
      <DialogContent>
        <DialogContentText>Введите название нового чата</DialogContentText>
        <TextField
          value={value}
          onChange={handleChange}
          autoFocus
          margin="dense"
          id="name"
          // label="Email Address"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Отмена</Button>
        <Button onClick={handleCreate}>Создать</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChatBar;
