import React from 'react';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import NavBarStyles from '../styles/NavBar.js'
import {isAuthenticated, logout} from './AuthService'

const NavBar = (props) => {
  const { classes } = props;

  return(
    <div>
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          SYL NavBar
        </Typography>
        <Button href="/">Home</Button>
        <Button component={Link} to="/example">Example</Button>
        <Button component={Link} to="/get">Get</Button>
        <Button component={Link} to="/dashboard">Dashboard</Button>
        <Button component={Link} to="/login" color="primary" variant="outlined">
          Login
        </Button>
      </Toolbar>
    </AppBar>
    </div>
  )
}
export default withStyles(NavBarStyles)(NavBar);



