import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ExampleGetStyles from '../styles/ExampleGet.js';

class ExampleGet extends Component {
  constructor() {
    super();

    // Initiate state
    this.state = { 
      links: []
    };
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getLinks();
  }

  // Call GET function for links
  getLinks = () => {
    // NOTE: if you have params, pass them like so:
    // var options = {
    //   headers: {
    //     'Authorization': 'Token a5f5f3f6ca732355d3dea21613f6a9567d6f8a98'
    //   },
    //   params: {
    //     key: 'value'
    //   }
    // }
    axios.get('http://localhost:8000/api/links/', {})
      .then(result => {
        let links = result.data.map(function(link) { 
          return { 
            id: link.id, 
            url: link.url, 
            creator_id: link.creator
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
    var links = this.state.links.map(links => {
      return <p key={links.id}>{links.id}: {links.url}</p>
    });

    return (
      <div className={classes.get}>
        <Typography variant="h6" gutterBottom>
          Link List
        </Typography>
        {links}
      </div>
    );
  }
}

export default withStyles(ExampleGetStyles)(ExampleGet);
