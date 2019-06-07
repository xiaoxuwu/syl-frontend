import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import EditStyles from '../styles/Edit.js';

import EditableLinkCard from '../components/EditableLinkCard.js';
import PreferenceCard from '../components/PreferenceCard.js'
import Preview from '../components/Preview.js';


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      links: [],
      userPref: {},
      username: localStorage.getItem('username'),
      newProfile: '',
      newBg: '',
      baseURL: process.env.REACT_APP_API_URL 
    };
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getUserLinks();
    this.getUserPref();
  }

  // Makes GET requests to retrieve username and links
  getUserLinks = () => {
    let token = localStorage.getItem('token');
    var apiEndpoint = '/api/users/';

    axios.get(apiEndpoint, { 'headers': { 'Authorization': 'Token ' + token } }).then(result => {
      let user = result.data;

      this.setState({ 
        username: user.username,
      });

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
    var apiEndpoint = '/api/preferences/?username=' + this.state.username;

    axios.get(apiEndpoint, {}).then(result => {
      let users = result.data;

      this.setState({ 
        userPref: users,
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;

    var editableLinks = this.state.links
      .sort((a,b) => (a.order > b.order) ? 1 : -1)
      .map(link => {
        var IMG = this.state.baseURL + '/' + link.media_prefix + link.image;
        return <EditableLinkCard 
          key={link.id}
          link_id={link.id} 
          image={IMG} 
          URL={link.url} 
          title={link.text}
          token={localStorage.getItem('token')}
          username={this.state.username}
          getParentLinks={this.getUserLinks}  />
    });

    var userPref = this.state.userPref;
    var background_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.background_img;
    var preferenceCard = <PreferenceCard username={this.state.username} />

    const background = {
      backgroundImage: `url(${background_pic})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };

    return (
        <div style={background} className={classes.content}>
          <Grid container spacing={16} md="8" className={classes.list}>
            <Grid item spacing={16} md="12" className={classes.pref}>
              {preferenceCard}
            </Grid>

            <Grid container spacing={16} md="12" className={classes.editList}>
              {editableLinks.map(editableLinkCard =>
                <Grid item xs={10} md={10}>
                  {editableLinkCard}
                </Grid>
                )  
              }
            </Grid>
          </Grid>
          <Grid container spacing={16} md="4" className={classes.list}>
            <Preview />
          </Grid>
        </div>
    );
  }
}

export default withStyles(EditStyles)(Edit);