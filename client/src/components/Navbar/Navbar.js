import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import useStyle from "./styles";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory,useLocation } from "react-router-dom";
import logo3 from '../../images/icons8-memories-58.png';
import logo from '../../images/memories-Text.png';
import decode from 'jwt-decode';
function Navbar() {
  const classes = useStyle();
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  

  useEffect(() => {
    const token = user?.token;
    if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp*1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
      <img src={logo} className={classes.image} height="30px" style={{marginRight:"10px"}} />
      <img src={logo3} alt="icon" height="30px" />
      {/*   <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        /> */}
      </Link>
      <Toolbar className={classes.Toolbar}></Toolbar>
      {user ? (
        <div className={classes.profile}>
          
          <Avatar
            className={classes.purple}
            alt={user.result.name}
            src={user.result.imageUrl}
          >
            {user.result.name.charAt(0)}
          </Avatar>
          <Typography className={classes.username} variant="h6">
            {user.result.name}
          </Typography>
          <Button
            className={classes.logout}
            variant="contained"
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Sign in
        </Button>
      )}
    </AppBar>
  );
}

export default Navbar;
