import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditableLinkCardStyles from '../styles/EditableLinkCard.js'

class EditableLinkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link_id: this.props.link_id,
      URL: this.props.URL,
      IMG: this.props.IMG,
      order: this.props.order,
      links: this.props.links,
      title: this.props.title,
      token: this.props.token,
      username: this.props.username,
      newImg: null
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleImg = this.handleImg.bind(this);
  }

  handleDeleteClick(e) {
    // Change the order of all other links
    this.state.links.map(link => { 
      if (link.order > this.state.order) {
        var apiEndpoint = '/api/links/' + link.id;

        var data = {
          'order': link.order - 1,
        }

        axios.patch(apiEndpoint, data, {'headers' : { 'Authorization': 'Token ' + this.state.token,
                                                'Content-Type': 'application/json' }})
          .then(result => {
            this.props.getParentLinks();
            })
        }
    });

    var deleteEndpoint = '/api/links/' + this.state.link_id;
    axios.delete(deleteEndpoint, { 'headers': { 'Authorization': 'Token ' + this.state.token } })
      .then(result => {
        this.props.getParentLinks();
        })
      .catch(err => console.log(err));

  }

  handleSaveClick(e) {
    var apiEndpoint = '/api/links/' + this.state.link_id;

    var data = {
      'text': this.state.title,
      'url': this.state.URL,
      'image': this.state.IMG
    }

    axios.patch(apiEndpoint, data, {'headers' : { 'Authorization': 'Token ' + this.state.token,
                                            'Content-Type': 'application/json' }})
      .then(result => {
        this.props.getParentLinks();
        })
      .catch(err => console.log(err.response));

    if (this.state.newImg !== null) {
      var imgData = new FormData();
      imgData.append('image', this.state.newImg);
      var imgConfig = {
        'headers' : {
          'Authorization': 'Token ' + this.state.token,
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.patch(apiEndpoint, imgData, imgConfig).then(
        this.setState({
          newImg: null,
        })
      ).catch(err => console.log(err.response));
    }
  }

  handleImg(e) {
    this.setState({
      newImg: e.target.files[0]
    });
  }

  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.card} elevation={0}>
        <CardContent
          className={classes.content}>
            <Grid container>
              <Grid item sm={6}>
            <TextField
              name="title"
              className={classes.inputs}
              value={this.state.title}
              placeholder="Enter Text"
              onChange={e => this.setState({title: e.target.value})} /></Grid>
              <Grid item sm={5}>
            <TextField
              name="url"
              className={classes.inputs}
              value={this.state.URL}
              placeholder="Enter URL"
              onChange={e => this.setState({URL: e.target.value})} /></Grid>
            </Grid>
            <Button size='small' onClick={e => this.setState({IMG: null})}>
              Reset Image
            </Button>
            <Input 
                type="file" 
                name="img" 
                onChange={this.handleImg}
                disableUnderline={true}
                value={this.state.newImg ? this.state.newImg.value : ''}/>
        </CardContent>
        <div className={classes.actions}>
          <IconButton className={classes.action} aria-label="Save" onClick={this.handleSaveClick}>
            <SaveIcon />
          </IconButton>
          <IconButton className={classes.action} aria-label="Delete" onClick={this.handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
    );
  }
}

export default withStyles(EditableLinkCardStyles)(EditableLinkCard);
