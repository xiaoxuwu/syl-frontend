import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import NavBarStyles from '../styles/NavBar.js'
import { injectLogo } from './SVGInjectors'

class NavBar extends Component {

<<<<<<< HEAD
  render() {
    const { classes, getLoginCallback } = this.props;

    let loggedIn = getLoginCallback()
    let url = loggedIn ? "/logout" : "/login"
    let text = loggedIn ? "Logout" : "Login"
    let authButton = 
        <Button component={Link} to={url} color="primary" variant="outlined">
          {text}
=======
  return(
    <div>
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          SYL NavBar
        </Typography>
        <Button href="/">Home</Button>
        <Button component={Link} to="/get">Get</Button>
        <Button component={Link} to="/links">Links</Button>
        <Button component={Link} to="/dashboard">Dashboard</Button>
        <Button component={Link} to="/login" color="primary" variant="outlined">
          Login
>>>>>>> Yun-Link-List
        </Button>

    return (
      <div>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <span className={classes.logo}>
            {injectLogo()}
          </span>
          <div className={classes.grow} />
          <Button className={classes.navlink} href="/">Home</Button>
          {loggedIn ? <Button component={Link} className={classes.navlink} to="/dashboard">Dashboard</Button> : null }
          {authButton}
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}
export default withStyles(NavBarStyles)(NavBar);



