import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/MenuRounded";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SmsIcon from "@material-ui/icons/SmsOutlined";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";

const Nav = () => {
  // State
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setTimeout(() => {
      setOpen((prevState) => !prevState);
    }, 400);
  };

  // Object Destructuring
  const { push } = useHistory();

  const onCloseDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  //   Go to next page
  const go = (link) => {
    setTimeout(() => {
      push(link);
    }, 400);
  };
  return (
    <nav>
      <AppBar position="relative" style={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <IconButton onClick={handleDrawer} className="outline me-3">
            <MenuIcon />
          </IconButton>
          <h1 className="mb-0 text-dark fw-bold">Dashboard</h1>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={onCloseDrawer}>
        <div style={{ width: 300 }}>
          <div className="d-flex justify-content-end">
            <IconButton onClick={handleDrawer} className="outline">
              <BackIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => go("/sms")}>
              <ListItemIcon>
                <SmsIcon />
              </ListItemIcon>
              <ListItemText>SMS</ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default Nav;
