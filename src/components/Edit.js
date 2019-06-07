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


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      links: [],
      user: {},
      newProfile: '',
      newBg: '',
      baseURL: process.env.REACT_APP_API_URL 
    };
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getUserLinks();
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
        }).sort((a,b) => (a.order < b.order) ? 1 : -1);

        this.setState({ 
          links: links,
        });
      }).catch(err => console.log(err));
  }

  handleAddLink() {
    // let token = localStorage.getItem('token');
    // var apiEndpoint = '/api/links/';

    // var maxOrder = 0;

    // this.state.links.map(link => {
    //   if (link.order > maxOrder) {
    //     maxOrder = link.order
    //   }
    // })


    // var data = {
    //   'url': '',
    //   'creator': this.state.user.id,
    //   'text': '',
    //   'image': null,
    //   'order': maxOrder+1,
    //   "media_prefix": "media/"
    // }

    // axios.post(apiEndpoint, data, {'headers' : { 'Authorization': 'Token ' + this.state.token,
    //                                         'Content-Type': 'application/json' }})
    //   .then(result => {
    //     console.log(result.data);
    //     this.props.getParentLinks();
    //     })
    //   .catch(err => console.log(err.response));
  }

  render() {
    const { classes } = this.props;

    var editableLinks = this.state.links
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

    var preferenceCard = <PreferenceCard/>

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
                    placeholder="www.example.com"
                    className={classes.addLinkInput}
                  />
                  <Button variant="contained" className={classes.addLinkButton}>+ ADD NEW LINK</Button>
                </Paper>
              </div>
              <Grid container spacing={16} className={classes.editList}>
                {editableLinks.map((editableLinkCard, i) => {
                  return <Grid item key={this.state.links[i].id} xs={10} md={10}>
                    {editableLinkCard}
                  </Grid>
                  })  
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
