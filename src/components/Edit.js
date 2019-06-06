import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import SaveIcon from '@material-ui/icons/Save';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

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
      user: {},
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

  // Makes GET requests to retrieve user and links
  getUserLinks = () => {
    let token = localStorage.getItem('token');
    var apiEndpoint = '/api/users/';

    axios.get(apiEndpoint, { 'headers': { 'Authorization': 'Token ' + token } }).then(result => {
      let user = result.data;

      this.setState({ 
        user: user,
      });

      var apiEndpoint = '/api/links/?username=' + user.username;

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
    var apiEndpoint = '/api/preferences/?username=' + this.state.user.username;

    axios.get(apiEndpoint, {}).then(result => {
      let prefs = result.data;

        this.setState({ 
          userPref: prefs,
        });
    }).catch(err => console.log(err));
  }

  handleAddLink() {
    // TBD
  }

  render() {
    const { classes } = this.props;

    var editableLinks = this.state.links
      .sort((a,b) => (a.order < b.order) ? 1 : -1)
      .map(link => {
        var IMG = this.state.baseURL + '/' + link.media_prefix + link.image;
        return <EditableLinkCard 
          key={link.id}
          link_id={link.id} 
          image={IMG} 
          URL={link.url} 
          title={link.text}
          token={localStorage.getItem('token')}
          username={this.state.user.username}
          getParentLinks={this.getUserLinks}  />
    });

    var userPref = this.state.userPref;
    var background_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.background_img;
    var preferenceCard = <PreferenceCard username={this.state.user.username} />

    return (
        <div className={classes.content}>
          <Grid container spacing={16} md="8" className={classes.list}>
            <Grid item md="12" className={classes.pref}>
              {preferenceCard}
            </Grid>

            <Grid container spacing={16} md="12" className={classes.editList}>
              <Grid item xs={10} md={10}>
                <Paper className={classes.addLink}>
                  <InputBase
                    placeholder="www.example.com"
                    className={classes.addLinkInput}
                  />
                  <Button variant="contained" className={classes.addLinkButton}>+ ADD NEW LINK</Button>
                </Paper>
              </Grid>
              {editableLinks.map(editableLinkCard =>
                <Grid item xs={10} md={10}>
                  {editableLinkCard}
                </Grid>
                )  
              }
            </Grid>
          </Grid>
          <Grid container spacing={16} md="4" className={classes.preview}>
            <Preview />
          </Grid>
        </div>
    );
  }
}

export default withStyles(EditStyles)(Edit);