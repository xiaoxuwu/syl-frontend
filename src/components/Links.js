import React, { Component } from 'react';
import axios from './AxiosClient';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LinksStyles from '../styles/Links.js';

import LinkCard from './LinkCard.js';

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pCol: 12,
      dCol: 12,
      links: [],
      userPref: null,
      updateLinks: this.props.updateLinks,
      username: this.props.username ? this.props.username : this.props.match.params.username,
      baseURL: process.env.REACT_APP_API_URL
    };
    this.getUserLinks();
  }

  // Called when component has been initialized
  componentDidMount() {
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
        }).sort((a,b) => (a.order < b.order) ? 1 : -1);

        // Checks if links changed before changing state
        if (this.state.links.length !== links.length) {
            this.setState({
            links: links,
          });
        }

        this.state.links.map(stateLink => {
          links.map(link => {
            if (stateLink.id === link.id) {
              if (stateLink.url !== link.url || stateLink.creator_id !== link.creator_id ||
                  stateLink.text !== link.text || stateLink.image !== link.image ||
                  stateLink.order !== link.order || stateLink.media_prefix !== link.media_prefix) {
                this.setState({
                  links: links,
                });
              }
            }
          })
        })
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
    // this.getUserLinks();

    if (this.state.userPref === null) {
      return <div> </div>
    }
    const { classes, parentClasses } = this.props;
    var user = this.state.username;
    var userPref = this.state.userPref;
    var profile_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.profile_img;
    var background_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.background_img;
    var previewContainer = null;
    if (parentClasses !== undefined) {
      previewContainer = parentClasses.previewContainer
    }

    const background = userPref.background_img ? {
      backgroundImage: `url(${background_pic})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }: {background: 'linear-gradient(to left, #f7ff00, #db36a4)'};

    let links = this.props.links ? this.props.links : this.state.links;

    return (
        <div style={background} className={classes.content}>
          <div className={classes.imgWrapper}>
            <img
              src={profile_pic}
              className={classes.media}
              alt="link"
            />
          </div>
          <Typography variant="h4" component="h4" className={classes.handleText}>
            @{user}
          </Typography>
          <div className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2} className={classes.list}>
              {links.map(link => {
                var IMG = link.image ? this.state.baseURL + '/' + link.media_prefix + link.image : null;
                var text = link.text ? link.text : link.url;
                var linkcard = <LinkCard
                          key={link.id}
                          title={text}
                          link_id={link.id}
                          image={IMG}
                          URL={link.url}
                          />;
                return <Grid item xs={this.state.pCol} md={this.state.dCol} lg={this.state.dCol}>
                          {linkcard}
                    </Grid>
                })
              }
            </Grid>
          </div>
        </div>
    );
  }
}

export default withStyles(LinksStyles)(Links);
