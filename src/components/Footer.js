import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Icon from "@mdi/react";
import { mdiInstagram, mdiFacebookBox, mdiTwitter } from "@mdi/js";

import FooterStyles from '../styles/Footer.js'

const Footer = (props) => {
  const { classes } = props;
  const iconSize = 1;

  return (
    <div className={classes.footerDiv}>
      <BottomNavigation showLabels className={classes.footerNav}>
        <BottomNavigationAction label="Instagram" 
            icon={<Icon path={mdiInstagram} size={iconSize} color="grey" className={classes.icon} />} 
            component="a" href="https://www.instagram.com/"
        />
        <BottomNavigationAction label="Facebook" 
          icon={<Icon path={mdiFacebookBox} size={iconSize} color="grey" className={classes.icon} />}
          component="a" href="https://www.facebook.com/" 
        />
        <BottomNavigationAction label="Twitter" 
          icon={<Icon path={mdiTwitter} size={iconSize} color="grey" className={classes.icon} />}
          component="a" href="https://twitter.com/" 
        />
      </BottomNavigation>
      <p className={classes.trademark}>© 2019 ShopYourLinks </p>
    </div>
  )
}

export default withStyles(FooterStyles)(Footer)
