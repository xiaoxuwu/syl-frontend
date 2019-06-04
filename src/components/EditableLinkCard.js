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
  }

  handleDeleteClick(e) {
    var deleteEndpoint = '/api/links/' + this.state.link_id;
    axios.delete(deleteEndpoint, { 'headers': { 'Authorization': 'Token ' + this.state.token } })
      .then(result => {
        this.props.getParentLinks();
        })
      .catch(err => console.log(err));

  }

  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.card}>
        {this.state.IMG ?
          <CardMedia
            className={classes.media}
            image={this.state.IMG}
          /> 
          : null
        }
        <CardContent
          className={classes.content}
        >
          {this.state.IMG ? 
            <Typography gutterBottom variant="h5" component="h2">
              <Input
                className={classes.inputs}
                defaultValue={this.state.title}
              />
              <Input
                className={classes.adjacentInputs}
                defaultValue={this.state.URL}
              />
            </Typography> 
            : 
            <Typography gutterBottom variant="h5" component="h2" align='center'>
              <Input
                className={classes.inputs}
                defaultValue={this.state.title}
              />
              <Input
                className={classes.adjacentInputs}
                defaultValue={this.state.URL}
              />
            </Typography>
          }
        </CardContent>
        <div className={classes.actions}>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={this.handleDeleteClick}/>
          </IconButton>
        </div>
      </Card>
    );
  }
}

export default withStyles(EditableLinkCardStyles)(EditableLinkCard);