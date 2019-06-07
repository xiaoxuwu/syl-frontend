import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import EditStyles from '../styles/Edit.js';

import PreferenceCard from '../components/PreferenceCard.js';
import DraggableCard from './DraggableCard.js';
import Preview from '../components/Preview.js';
import ErrorIcon from '@material-ui/icons/Error';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      user: {},
      addedURL: '',
      addedTitle: '',
      invalidURL: false,
      baseURL: process.env.REACT_APP_API_URL
    };

    this.handleAddLink = this.handleAddLink.bind(this);
    this.getUser();
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
      }).sort((a,b) => (a.order < b.order) ? 1 : -1);

      this.setState({
        links: links,
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
        'text': this.state.addedTitle,
        'image': null,
        'order': maxOrder+1,
        "media_prefix": "media/"
      }

      axios.post(apiEndpoint, data, {'headers' : { 'Authorization': 'Token ' + token,
                                              'Content-Type': 'application/json' }})
        .then(result => {
          this.getLinks();
          })
        .catch(err => console.log(err.response));

      var reset = document.getElementById("InputUrl");
      if (reset) {
        reset.value="";
      }
      reset = document.getElementById("InputTitle");
      if (reset) {
        reset.value="";
      }
    }
  }

  render() {
    const { classes } = this.props;

    var preferenceCard = <PreferenceCard />;
    var errorMsg = this.state.invalidURL ?
                  <Grid container direction="row" className={classes.error} alignItems="center">
                    <Grid item>
                      <ErrorIcon color="error"/>
                    </Grid>
                    <Grid item className={classes.errorMsg}>
                      Please enter a valid URL!
                    </Grid>
                  </Grid> : null;

    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = this.state.links[dragIndex]
      var updateLink = update(this.state.links, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
      });
      this.setState({
        links: updateLink
      });
      for (var i = 0; i < this.state.links.length; i++) {
        if (dragIndex !== hoverIndex) {
          var apiEndpoint = '/api/links/' + this.state.links[i].id;

          var data = {
            'order': this.state.links.length-i
          }

          let token = localStorage.getItem('token');
          axios.patch(apiEndpoint, data, {'headers' : { 'Authorization': 'Token ' + token,
                                                  'Content-Type': 'application/json' }})
            .then(result => {
              this.props.getParentLinks();
              })
            .catch(err => console.log(err.response));
        }
      }
    }
    return (
      <div className={classes.content}>
        <Grid container spacing={16} className={classes.list}>
          <Grid item xs className={classes.overflowWrapper}>
            <div className={classes.pref}>
              {preferenceCard}
            </div>
            <div className={classes.editCardWrapper} >
            <Card className={classes.card} elevation={0}>
            {errorMsg}
            <CardContent
                className={classes.content}>
                  <TextField
                    id="InputTitle"
                    name="title"
                    label="New Link's Text"
                    variant="outlined"
                    className={classes.inputs}
                    value={this.state.title}
                    onChange={e => this.setState({addedTitle: e.target.value})} />
                  <TextField
                    id="InputUrl"
                    name="url"
                    label="New Link's URL"
                    variant="outlined"
                    className={classes.inputs}
                    value={this.state.URL}
                    onChange={e => this.setState({addedURL: e.target.value, invalidURL: false})} />
                  <Button variant="contained" className={classes.addLinkButton} onClick={this.handleAddLink}>+ ADD NEW LINK</Button>
              </CardContent>
            </Card>
            </div>
          <Grid container spacing={12} className={classes.editList}>
            <div className={classes.fullWidth}>
              {this.state.links.map((link, i) => (
                <DraggableCard
                  key={link.id}
                  index={i}
                  id={link.id}
                  text={link.text}
                  order={link.order}
                  links={this.state.links}
                  moveCard={moveCard}
                  url={link.url}
                  img={link.image}
                  token={localStorage.getItem('token')}
                  username={this.state.user.username}
                  getParentLinks={this.getLinks}
                  classes={classes}
                />
              ))}
            </div>
          </Grid>
        </Grid>
        <Grid item xs={4} className={classes.preview}>
          <Preview links={this.state.links}/>
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default withStyles(EditStyles)(Edit);
