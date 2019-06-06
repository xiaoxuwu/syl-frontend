import React, { Component } from 'react';
import axios from './AxiosClient';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import TextField from '@material-ui/core/TextField';

import EditableLinkCardStyles from '../styles/EditableLinkCard.js'

class EditableLinkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link_id: this.props.link_id,
      URL: this.props.URL,
      IMG: this.props.image,
      title: this.props.title,
      token: this.props.token,
      username: this.props.username,
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleDeleteClick(e) {
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
      'url': this.state.URL
    }

    axios.patch(apiEndpoint, data, {'headers' : { 'Authorization': 'Token ' + this.state.token,
                                            'Content-Type': 'application/json' }})
      .then(result => {
        console.log(result.data);
        this.props.getParentLinks();
        })
      .catch(err => console.log(err.response));
  }

  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.card}>
        <CardContent
          className={classes.content}>
            <TextField
              name="title"
              className={classes.inputs}
              value={this.state.title}
              onChange={e => this.setState({title: e.target.value})} />
            <TextField
              name="url"
              className={classes.inputs}
              value={this.state.URL}
              onChange={e => this.setState({URL: e.target.value})} />
        </CardContent>
        <div className={classes.actions}>
          <IconButton className={classes.action} aria-label="Save">
            <SaveIcon onClick={this.handleSaveClick}/>
          </IconButton>
          <IconButton className={classes.action} aria-label="Delete">
            <DeleteIcon onClick={this.handleDeleteClick}/>
          </IconButton>
        </div>
      </Card>
    );
  }
}

export default withStyles(EditableLinkCardStyles)(EditableLinkCard);