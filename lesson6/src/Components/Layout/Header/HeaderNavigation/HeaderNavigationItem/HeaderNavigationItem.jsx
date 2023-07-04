import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";

const HeaderNavigationItem = ({ link, text }) => {
  return (
    <Button
      variant="text"
      component={RouterLink}
      to={`${link}`}
      sx={{ color: "primary.contrastText" }}
    >
      {text}
    </Button>
  );
};

export default HeaderNavigationItem;
