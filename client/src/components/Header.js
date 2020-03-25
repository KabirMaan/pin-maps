import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogout } from "react-google-login";
import Context from "../context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Public from "@material-ui/icons/Public";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery } from "@material-ui/core";

const Header = ({ classes }) => {
  const mobileSize = useMediaQuery("(max-width:650px)");
  const { state, dispatch } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = state;
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
    console.log("LOGGED OUT user");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>
            <Public className={classes.icon} />
            <Typography
              className={mobileSize ? classes.mobile : ""}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              PinMaps
            </Typography>
          </div>
          {currentUser && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img
                  className={classes.picture}
                  src={currentUser.picture}
                  alt={currentUser.name}
                />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem disabled>Profile</MenuItem>
                <MenuItem disabled>My Account</MenuItem>
                <MenuItem>
                  <GoogleLogout
                    onLogoutSuccess={onLogout}
                    render={({ onClick }) => (
                      <span onClick={onClick}>Logout</span>
                    )}
                  />
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  appBar: { boxShadow: "none" },

  icon: {
    marginRight: theme.spacing(1),
    color: "white",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },

  picture: {
    height: "30px",
    borderRadius: "90%"
  }
});

export default withStyles(styles)(Header);
