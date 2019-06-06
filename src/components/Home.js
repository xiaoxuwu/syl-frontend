import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeStyles from '../styles/Home.js'
import LogoImage from '../assets/images/logo-name.svg'

class Home extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.background}>
        <img src={LogoImage} alt="SYL" className={classes.logo} />
      </div>
    )
  }
}

export default withStyles(HomeStyles)(Home);
