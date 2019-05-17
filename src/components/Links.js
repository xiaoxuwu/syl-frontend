import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ListStyles from '../styles/Links.js';

import LinkCard from '../components/LinkCard.js';

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pCol: '', 
      dCol: '', 
      links: [],
      username: this.props.match.params.username,
      baseURL: process.env.REACT_APP_API_URL 
    };
    this.state.pCol = 12;
    this.state.dCol = 4;
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getLinks();
  }

  // Call GET function for links
  getLinks = () => {
    var apiCall = '/api/links/?username=' + this.state.username;
    axios.get(apiCall, {})
      .then(result => {
        let links = result.data.map(function(link) { 
          return { 
            id: link.id, 
            url: link.url, 
            creator_id: link.creator,
            text: link.text,
            image: link.image,
            order: link.order,
            media_prefix: link.media_prefix
          }
        });

        this.setState({ 
          links: links,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    var links = this.state.links
      .sort((a,b) => (a.order > b.order) ? 1 : -1)
      .map(link => {
        var IMG = this.state.baseURL + '/' + link.media_prefix + link.image;
        return <LinkCard 
          key={link.id} 
          image={IMG} 
          URL={link.url} 
          title={link.text}  />
    });
    var user = this.state.username;

    return (
      <div className={classes.content}>
        <Typography variant="display3" component="h2" align="center">
          Welcome to {user}'s Page
        </Typography>
        <div className={classes.list}>
          <Grid container spacing={16}>
            {links.map(linkCard =>
              <Grid item xs={this.state.pCol} md={this.state.dCol}>
                {linkCard}
              </Grid>
              )  
            }
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(ListStyles)(Links);