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
    console.log('FUCK YOU')
    console.log(this.props)
    this.state = {
      username: this.props.username,
      userPref: {},
      newProfile: '',
      newBg: '',
      baseURL: process.env.REACT_APP_API_URL 
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.handleBackground= this.handleBackground.bind(this);
    this.handlePrefSubmit = this.handlePrefSubmit.bind(this);
    console.log('PREFERENCE CARD!!!')
    console.log(this.state.username);
  }

  handleProfile(e) {
    this.setState({
      newProfile: e.target.value
    });
  }

  handleBackground(e) {
    this.setState({
      newBg: e.target.value
    });
  }

  handlePrefSubmit(e) {
    var apiEndpoint = '/api/preferences/';
    if (this.state.newProfile !== '') {
      var profileData = 'profile_img=' + this.state.newProfile;
      axios.post(apiEndpoint, profileData).catch(err => console.log(err));
      this.setState({
        newProfile: ''
      });
    }

    if (this.state.newProfile !== '') {
      var bgData = 'background_img=' + this.state.newBg;
      axios.post(apiEndpoint, bgData).catch(err => console.log(err));
      this.setState({
        newBg: ''
      });
    }
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


