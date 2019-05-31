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
        username: 'test',
        baseURL: process.env.REACT_APP_API_URL 
      };
  }

  getUser = () => {
    console.log("Getting user2")
    let token = localStorage.getItem('token');
    var apiEndpoint = '/api/users/';
    axios.get(apiEndpoint, { 'headers': { 'Authorization': 'Token ' + token } }).then(result => {
      let user = result.data;
      console.log("Username2");
      console.log(user.username);

      this.setState = ({ 
        username: user.username,
      });

      console.log("Returning username")

      return user.username;

    }).then(username => {
        var apiEndpoint = '/api/links/?username=' + username;
        console.log("Getting links for2a:");
        console.log(username);
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

            console.log("links2");
            console.log(links);

            this.setState({ 
              links: links,
            });
          }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getUser();
    //this.getLinks(this.state.username);
  }

  // Call GET function for links
  // getLinks = (username) => {
  //   var apiEndpoint = '/api/links/?username=' + username;
  //   console.log("Getting links for2a:");
  //   console.log(username);
  //   axios.get(apiEndpoint, {})
  //     .then(result => {
  //       let links = result.data.map(function(link) { 
  //         return { 
  //           id: link.id, 
  //           url: link.url, 
  //           creator_id: link.creator,
  //           text: link.text,
  //           image: link.image,
  //           order: link.order,
  //           media_prefix: link.media_prefix
  //         }
  //       });

  //       console.log("links");
  //       console.log(links);

  //       this.setState({ 
  //         links: links,
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

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
    console.log("Rendering username:");
    console.log(this.state.username);

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