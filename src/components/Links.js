import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LinksStyles from '../styles/Links.js';

import LinkCard from '../components/LinkCard.js';

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pCol: 12, 
      dCol: 12, 
      links: [],
      userPref: {},
      username: this.props.match.params.username,
      baseURL: process.env.REACT_APP_API_URL 
    };
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getUserLinks();
    this.getUserPref();
  }

  // Call GET function for links
  getUserLinks = () => {
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

        console.log(links);
      })
      .catch(err => console.log(err));
  }

  getUserPref = () => {
    var apiEndpoint = '/api/preferences/?username=' + this.state.username;
    axios.get(apiEndpoint, {})
      .then(result => {
        let users = result.data;

        this.setState({ 
          userPref: users,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    var links = this.state.links
      .sort((a,b) => (a.order > b.order) ? 1 : -1)
      .map(link => {
        var IMG = link.image ? this.state.baseURL + '/' + link.media_prefix + link.image : null;
        var text = link.text ? link.text : link.url;
        console.log(IMG);
        return <LinkCard 
          key={link.id}
          link_id={link.id} 
          image={IMG} 
          URL={link.url} 
          title={text}  />
    });
    var user = this.state.username;
    var userPref = this.state.userPref;
    var profile_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.profile_img;
    var background_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.background_img;
    
    const background = userPref.background_img ? {
      backgroundImage: `url(${background_pic})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }: {background: 'linear-gradient(to left, #f7ff00, #db36a4)'};

    return (
        <div style={background} className={classes.content} >
          <img
            src={profile_pic}
            className={classes.media}
            alt="link"
          />
          <Typography variant="h4" component="h4" className={classes.handleText}>
            @{user}
          </Typography>
          <Grid container spacing={16} md="6" lg="5" className={classes.list}>
            {links.map(linkCard =>
              <Grid item xs={this.state.pCol} md={this.state.dCol} lg={this.state.dCol}>
                {linkCard}
              </Grid>
              )  
            }
          </Grid>
        </div>
    );
  }
}

export default withStyles(LinksStyles)(Links);