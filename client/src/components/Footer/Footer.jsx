import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import logo from "../../images/unicat-logo.png";
import { Link } from "react-router-dom";


const Footer = () => {
  const classes = useStyles();


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          className={classes.image}
          src={logo}
          alt="logo"
          height="40"
          to="/"
        />
      </Link>

        <Typography className={classes.copyright} variant="h6">
            &copy; 2022, UNICAT
        </Typography>

    </AppBar>
  );
};

export default Footer;
