import React, { Component } from 'react';
import axios from './AxiosClient';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import SaveIcon from '@material-ui/icons/Save';

import PreferenceCardStyles from '../styles/PreferenceCard.js'

class PreferenceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      token: localStorage.getItem('token'),
      userPref: {},
      newProfile: null,
      newBg: null,
      baseURL: process.env.REACT_APP_API_URL 
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.handleBackground= this.handleBackground.bind(this);
    this.handlePrefSubmit = this.handlePrefSubmit.bind(this);
  }

  handleProfile(e) {
    this.setState({
      newProfile: e.target.files[0]
    });
    console.log("HANDLE PROFILE")
    console.log(this.state.newProfile);
  }

  handleBackground(e) {
    this.setState({
      newBg: e.target.files[0]
    });
  }

  handlePrefSubmit(e) {
    var apiEndpoint = '/api/preferences/'+this.state.userPref.id;
    var updateData = new FormData();
    var config = {
      'headers' : { 
        'Authorization': 'Token ' + this.state.token, 
        'Content-Type': 'multipart/form-data' 
      }
    }

    if ((this.state.newProfile === null) && (this.state.newBg === null)) {
      return;
    }

    if (this.state.newProfile !== null) {
      updateData.append('profile_img', this.state.newProfile);
    } 
    
    if (this.state.newBg !== null) {
      updateData.append('background_img', this.state.newBg);
    } 

    axios.patch(apiEndpoint, updateData, config).then(
      this.setState({
        newProfile: null,
        newBg: null,
      })
    ).catch(err => console.log(err.response));
  }

  // Called when component has been initialized
  componentDidMount() {
    this.getUserPref();
  }

  // Makes GET requests to retrieve user profile and background picture
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
    const { classes } = this.props;
    var user = this.state.username;
    var userPref = this.state.userPref;
    var profile_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.profile_img;
    var background_pic = this.state.baseURL + '/' + userPref.media_prefix + userPref.background_img;

    return(
    	<Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={profile_pic}
          /> 
        <CardContent className={classes.info}>
          <Typography variant="display5" component="h3">
            Username: {user}
          </Typography>

          <FormControl>
            <InputLabel for="profile"> Profile Picture </InputLabel> <br/> <br/>
            <Typography variant="body1" gutterBottom>
              Currently: <a href={profile_pic}>{this.state.userPref.profile_img}</a>
              <br/>
              Change: <Input type="file" name="profile" onChange={this.handleProfile}/>
            </Typography>
          </FormControl>
   
          <FormControl>
            <InputLabel for="background"> Background Picture </InputLabel> <br/> <br/>
            <Typography variant="body1" gutterBottom>
              Currently: <a href={background_pic}>{this.state.userPref.background_img}</a>
              <br/>
              Change: <Input type="file" name="background" onChange={this.handleBackground}/>
            </Typography>
          </FormControl>

          <Button variant="contained" size="small" className={classes.button} onClick={this.handlePrefSubmit}>
            <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
            Save
          </Button>
        </CardContent>
    	</Card>
    );
  }
}

export default withStyles(PreferenceCardStyles)(PreferenceCard);


