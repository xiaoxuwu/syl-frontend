import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import HomeStyles from '../styles/Home.js';

import LinkCard from '../components/LinkCard.js';

class Home extends Component {
	constructor(props) {
    super(props);
    this.state = { 
      links: [],
      username: "yunx",
      baseURL: process.env.REACT_APP_API_URL 
    };
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getLinks();
  }

  // Call GET function for links
  getLinks = () => {
    var apiEndpoint = '/api/links/?username=' + this.state.username;
    axios.get(apiEndpoint, {})
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
          link_id={link.id} 
          image={IMG} 
          URL={link.url} 
          title={link.text}  />
    });
    var user = this.state.username;

    return (
        <div className={classes.content}>
          <Grid container spacing={16} md="4" className={classes.list}>
          	<Typography variant="display3" component="h2">
            	@{user}
          	</Typography>
          </Grid>
          <Grid container spacing={16} md="8" className={classes.list}>
            {links.map(linkCard =>
              <Grid item xs={10} md={10}>
                {linkCard}
              </Grid>
              )  
            }
          </Grid>
        </div>
    );
  }
}

export default withStyles(HomeStyles)(Home);