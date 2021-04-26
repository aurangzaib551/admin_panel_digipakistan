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
import ApplicationIcon from "@material-ui/icons/Assignment";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import RatingsIcon from "@material-ui/icons/StarRounded";

const Nav = ({ signOut }) => {
  // State
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setTimeout(() => {
      setOpen((prevState) => !prevState);
    }, 400);
  };

  // Object Destructuring
  const { push, replace } = useHistory();

  const onCloseDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  //   Go to next page
  const go = (link) => {
    setTimeout(() => {
      push(link);
    }, 400);
  };

  // Signing Out user
  const handleSignOut = () => {
    setTimeout(() => {
      signOut(replace);
    }, 400);
  };
  return (
    <nav>
      <AppBar position="relative" style={{ backgroundColor: "#fff" }}>
        <Toolbar className="d-flex flex-column flex-sm-row py-2">
          <div className="d-flex align-items-center">
            <IconButton onClick={handleDrawer} className="outline me-3">
              <MenuIcon />
            </IconButton>
            <h1 className="mb-0 text-dark fw-bold">Dashboard</h1>
          </div>

          <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-sm-end w-100">
            <Button
              onClick={handleSignOut}
              className="outline"
              variant="outlined"
            >
              Sign Out
            </Button>
          </div>
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
            <ListItem button onClick={() => go("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button onClick={() => go("/applicants")}>
              <ListItemIcon>
                <ApplicationIcon />
              </ListItemIcon>
              <ListItemText>Applicants Data</ListItemText>
            </ListItem>
            <ListItem button onClick={() => go("/ratings")}>
              <ListItemIcon>
                <RatingsIcon />
              </ListItemIcon>
              <ListItemText>Ratings</ListItemText>
            </ListItem>
            <ListItem button onClick={() => go("/registeredUser")}>
              <ListItemIcon>
                <ApplicationIcon />
              </ListItemIcon>
              <ListItemText>Registered Users</ListItemText>
            </ListItem>
            <ListItem button onClick={() => go("/marketing")}>
              <ListItemIcon>
                <ApplicationIcon />
              </ListItemIcon>
              <ListItemText>Marketing Requests</ListItemText>
            </ListItem>
            <ListItem button onClick={() => go("/marketingUsers")}>
              <ListItemIcon>
                <ApplicationIcon />
              </ListItemIcon>
              <ListItemText>Marketing Users</ListItemText>
            </ListItem>
            <ListItem button onClick={() => go("/uploadLecture")}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText>Upload Lecture</ListItemText>
            </ListItem>
            <ListItem button onClick={() => go("/teachers")}>
              <ListItemIcon>
                <ApplicationIcon />
              </ListItemIcon>
              <ListItemText>Teachers Applications</ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (push) => dispatch(signOut(push)),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
