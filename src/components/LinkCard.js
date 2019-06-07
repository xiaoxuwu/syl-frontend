import React, { Component } from 'react';
import axios from './AxiosClient';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import LinkCardStyles from '../styles/LinkCard.js'

class LinkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link_id: this.props.link_id,
      URL: this.props.URL,
      IMG: this.props.image ? this.props.image : this.getFavicon(this.props.URL),
      title: this.props.title
    };
  }

  // TODO: add option to remove favicon default from edit view
  // https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript
  getFavicon = (url) => {
    var favicon_base_url = 'https://www.google.com/s2/favicons?sz=256&domain_url=';
    var img_url = favicon_base_url + url;
    var img = new Image();
    try {
      img.src = img_url;
      return img_url
    } catch(err) {
      return null
    }
  }

  handleClick = (e) => {
    window.open(this.state.URL);
    // this.setState({count: this.state.count+1});
    var apiEndpoint = '/api/events/';
    var eventData = 'link=' + this.state.link_id;
    axios.post(apiEndpoint, eventData).catch(err => console.log(err));
  }

  render() {
    const { parentClasses, classes } = this.props;
    var previewCardText = null
    if (parentClasses !== undefined) {
      previewCardText = parentClasses.previewCardText
    }
    return(
    	<Card className={classes.card}>
        {this.state.IMG ?
          <CardMedia
            className={classes.media}
            image={this.state.IMG}
          /> 
          : null
        }
    		<CardActionArea onClick={this.handleClick}> 
          <CardContent>
            {this.state.IMG ? 
      				<Typography 
                gutterBottom 
                variant="h5" 
                component="h2" 
                className={clsx(classes.cardText, previewCardText)}>
      					{this.state.title}
      				</Typography> 
              : 
              <Typography 
                gutterBottom v
                ariant="h5" 
                component="h2" 
                align='center' 
                className={clsx(classes.cardText, previewCardText)}>
                {this.state.title}
              </Typography>
            }
          </CardContent>
    		</CardActionArea>
    	</Card>
    );
  }
}

export default withStyles(LinkCardStyles)(LinkCard);


