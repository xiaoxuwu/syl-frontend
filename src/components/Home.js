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
        userPref: {},
        username: '',
        baseURL: process.env.REACT_APP_API_URL 
      };
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getUserLinks();
    this.getUserPref();
  }

  // Makes GET requests to retrieve username and links
  getUserLinks() {
    let token = localStorage.getItem('token');
    var apiEndpoint = '/api/users/';

    axios.get(apiEndpoint, { 'headers': { 'Authorization': 'Token ' + token } }).then(result => {
      let user = result.data;

      this.setState({ 
        username: user.username,
      });

      console.log("getlinks in axios!");
      console.log(this.state.username);

      var apiEndpoint = '/api/links/?username=' + this.state.username;

      return axios.get(apiEndpoint, {})}).then(result => {

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
      }).catch(err => console.log(err));
  }

  // Makes GET requests to retrieve user profile and background picture
  getUserPref() {
    let token = localStorage.getItem('token');
    var apiEndpoint = '/api/users/';

    axios.get(apiEndpoint, { 'headers': { 'Authorization': 'Token ' + token } }).then(result => {
      let user = result.data;

      this.setState({ 
        username: user.username,
      });

      var apiEndpoint = '/api/preferences/?username=' + this.state.username;

      return axios.get(apiEndpoint, {})}).then(result => {
        let users = result.data;

        this.setState({ 
          userPref: users,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log("IN RENDER!")
    console.log(this.state.username);
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
    var userPref = this.state.userPref;
    var profile_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.profile_img;
    var background_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.background_img;

    const background = {
      backgroundImage: `url(${background_pic})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };

    return (
        <div style={background} className={classes.content}>
          <Grid container spacing={16} md="8" className={classes.list}>
            <Grid item spacing={16} md="12" className={classes.pref}>
              <img
                src={profile_pic}
                alt={this.state.baseURL + '/' + userPref.media_prefix + "IMG0.png"}
                className={classes.media}
              />
            	<Grid item spacing={16} md="12" className={classes.info}>
                <Typography variant="display5" component="h3">
                	Username: {user}
              	</Typography>
                <Typography variant="display5" component="h3">
                  Profile Picture: {this.state.userPref.profile_img}
                </Typography>
                <Typography variant="display5" component="h3">
                  Background Picture: {this.state.userPref.background_img}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={16} md="12" className={classes.editList}>
              {links.map(linkCard =>
                <Grid item xs={10} md={10}>
                  {linkCard}
                </Grid>
                )  
              }
            </Grid>
          </Grid>
          <Grid container spacing={16} md="4" className={classes.list}>
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