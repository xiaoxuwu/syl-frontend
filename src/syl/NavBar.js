import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles, withWidth } from '@material-ui/core'
import NavBarStyles from '../styles/NavBar.js'
import { injectLogo } from './SVGInjectors'

import { Dashboard } from 'components';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';

// Material components
import {
  IconButton,
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

class NavBar extends Component {
  constructor(props) {
    super(props);

    const isMobile = ['xs', 'sm', 'md'].includes(props.width);

    this.state = {
      isOpen: this.props.isDashboard && !isMobile,
    };
    // console.log('navbar: ', this.state.isOpen)
  }

  handleClick = (isOpen) => {
    // console.log('handleClick og, state: ', this.state.isOpen, ', prop: ', isOpen)
    if (this.props.isDashboard) {
      this.setState({ isOpen: !isOpen }, function () {
        // console.log('handleClick new state: ', this.state.isOpen)
        this.props.onChange(this.state.isOpen)
      });
    }
  };

  render() {
    const { classes, isOpen, isDashboard, width, getLoginCallback } = this.props;
    const isMobile = ['xs', 'sm', 'md'].includes(width);
    const shiftTopbar = isOpen && !isMobile;

    let loggedIn = getLoginCallback()
    let url = loggedIn ? "/influencer/logout" : "/influencer/login"
    let text = loggedIn ? "Logout" : "Login"
    let authButton = 
      <Button component={Link} to={url} color="primary" variant="outlined">
        {text}
      </Button>

    return (
      <div>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classNames({
              [classes.topbarShift]: shiftTopbar,
              [classes.hideIconButton]: !isDashboard,
            })}
            onClick={() => this.handleClick(isOpen)}
            variant="text"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <div className={classes.grow} />
          <Button className={classes.navlink} component={Link} to="/influencer">Home</Button>
          <Button className={classes.navlink} component={Link} to="/influencer/preview">Preview</Button>
          {loggedIn ? <Button component={Link} className={classes.navlink} to="/influencer/dashboard">Dashboard</Button> : null }
          {authButton}
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

// export default withStyles(NavBarStyles)(NavBar);
export default compose(
  withStyles(NavBarStyles),
  withWidth()
)(NavBar);
