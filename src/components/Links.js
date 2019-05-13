import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ListStyles from '../styles/Lists.js';

import LinkCard from '../components/LinkCard.js';

const Links = (props) => {
  const { classes } = props;
  var links = [];
  for (var i = 0; i < 6; i++) {
  	links.push(<LinkCard/>);
  }

  return (
    <div className={classes.list}>
      <Grid container>
      	{links}
      </Grid>
    </div>
  );
}

export default withStyles(ListStyles)(Links);