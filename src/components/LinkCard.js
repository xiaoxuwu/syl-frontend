import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LinkCardStyles from '../styles/LinkCard.js'

class LinkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link_id: this.props.link_id,
      URL: this.props.URL,
      IMG: this.props.image,
      title: this.props.title,
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    window.open(this.state.URL);
    // this.setState({count: this.state.count+1});
    var apiEndpoint = '/api/events/';
    var currentTime = new Date();
    var eventData = { link: this.state.link_id};
    console.log(this.state.link_id);
    axios.post(apiEndpoint, eventData).then(console.log(currentTime)).catch(err => console.log(err.response));
  }

  render() {
    const { classes } = this.props;
    return(
    	<Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.state.IMG}
          title="ShopYourLikes"
        />
    		<CardActionArea onClick={this.handleClick}>
    			<CardContent>
    				<Typography gutterBottom variant="h5" component="h2">
    					{this.state.title}
    				</Typography>
    			</CardContent>
    		</CardActionArea>
        <CardContent>
          {this.state.count}
        </CardContent>
    	</Card>
    );
  }
}

export default withStyles(LinkCardStyles)(LinkCard);


