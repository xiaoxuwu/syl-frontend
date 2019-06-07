import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import EditStyles from '../styles/Edit.js';

import EditableLinkCard from '../components/EditableLinkCard.js';
import PreferenceCard from '../components/PreferenceCard.js'
import Preview from '../components/Preview.js';
import ErrorIcon from '@material-ui/icons/Error';


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      links: [],
      editableLinks: [],
      userPref: {},
      user: {},
      newProfile: '',
      newBg: '',
      addedURL: '',
      invalidURL: false,
      baseURL: process.env.REACT_APP_API_URL 
    };
    this.handleAddLink = this.handleAddLink.bind(this);
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getUser();
    this.getUserPref();
  }

  // Makes GET request to retrieve user
  getUser = () => {
    let token = localStorage.getItem('token');
    var apiEndpoint = '/api/users/';

    axios.get(apiEndpoint, { 'headers': { 'Authorization': 'Token ' + token } }).then(result => {
      let user = result.data;

      this.setState({ 
        user: user,
      });
    }).then(this.getLinks()).catch(err => console.log(err));
  }

  // Makes GET request to retrieve links
  getLinks = () => {
    console.log("GETTING LINKS")
    let username = localStorage.getItem('username');
    var apiEndpoint = '/api/links/?username=' + username;

    return axios.get(apiEndpoint, {}).then(result => {

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

      var editableLinks = links
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
          getParentLinks={this.getLinks}  />
      });

      this.setState({ 
        links: links,
        editableLinks: editableLinks,
      });
    }).catch(err => console.log(err));
  }

  // Makes GET requests to retrieve user profile and background picture
  getUserPref() {
    var apiEndpoint = '/api/preferences/?username=' + this.state.user.username;

    axios.get(apiEndpoint, {}).then(result => {
      let prefs = result.data;

        this.setState({ 
          userPref: prefs,
        });
    }).catch(err => console.log(err));
  }

  isURL(str) {
    var pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
    return pattern.test(str);
  }

  handleAddLink() {
    if (!this.isURL(this.state.addedURL)) {
      this.setState({ 
          invalidURL: true,
      });
    } else {
      let token = localStorage.getItem('token');
      var apiEndpoint = '/api/links/';

      var maxOrder = 0;

      this.state.links.map(link => {
        if (link.order > maxOrder) {
          maxOrder = link.order
        }
      })

      var data = {
        'url': this.state.addedURL,
        'creator': this.state.user.id,
        'text': '',
        'image': null,
        'order': maxOrder+1,
        "media_prefix": "media/"
      }

      axios.post(apiEndpoint, data, {'headers' : { 'Authorization': 'Token ' + token,
                                              'Content-Type': 'application/json' }})
        .then(result => {
          console.log(result.data);
          this.getLinks();
          })
        .catch(err => console.log(err.response));

      var reset = document.getElementById("InputUrl");
      if (reset) {
        reset.value="";
      }
    }
  }

  render() {
    const { classes } = this.props;

    var userPref = this.state.userPref;
    var preferenceCard = <PreferenceCard username={this.state.user.username} />;
    var errorMsg = this.state.invalidURL ?
                  <Grid container direction="row" className={classes.error} alignItems="center">
                    <Grid item>
                      <ErrorIcon color="error"/>
                    </Grid>
                    <Grid item className={classes.errorMsg}>
                      Please enter a valid URL!
                    </Grid>
                  </Grid> : null;

    return (
        <div className={classes.content}>
          <Grid container spacing={16} className={classes.list}>
            <Grid item xs className={classes.overflowWrapper}>
              <div className={classes.pref}>
                {preferenceCard}
              </div>
              <div className={classes.linkWrapper}>
                <Paper className={classes.addLink}>
                  <InputBase
                    id="InputUrl"
                    placeholder="www.example.com"
                    className={classes.addLinkInput}
                    onChange={e => this.setState({addedURL: e.target.value, invalidURL: false})}
                  />
                  <Button variant="contained" className={classes.addLinkButton} onClick={this.handleAddLink}>+ ADD NEW LINK</Button>
                </Paper>
              </div>
              {errorMsg}
              <Grid container spacing={12} className={classes.editList}>
                {this.state.editableLinks.map(editableLinkCard =>
                  <Grid item xs={10} md={10}>
                    {editableLinkCard}
                  </Grid>
                  )  
                }
              </Grid>
            </Grid>
            <Grid item xs={4} className={classes.preview}>
              <Preview />
            </Grid>
          </Grid>

        </div>
    );
  }
}

export default withStyles(EditStyles)(Edit);
