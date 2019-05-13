import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IMG from './SYL_logo.png';

import LinkCardStyles from '../styles/LinkCard.js'

const LinkCard = (props) => {
  const { classes } = props;
  var URL = 'https://google.com';

  return(
  	<Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image= {IMG}
        title="ShopYourLikes"
      />
  		<CardActionArea onClick={()=>window.open(URL)}>
  			<CardContent>
  				<Typography gutterBottom variant="h5" component="h2">
  					FirstLink
  				</Typography>
  				<Typography component="p">
  					Hello from ShopYourLinks
  				</Typography>
  			</CardContent>
  		</CardActionArea>
  	</Card>
  );
}

export default withStyles(LinkCardStyles)(LinkCard);


