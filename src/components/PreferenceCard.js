import React, { Component } from 'react';
import axios from './AxiosClient';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';

import PreferenceCardStyles from '../styles/PreferenceCard.js'

class PreferenceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token'),
      pref_id: '',
      curProfile: '',
      curBg: '',
      media_prefix: '',
      newProfile: null,
      newBg: null,
      baseURL: process.env.REACT_APP_API_URL
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.handleBackground= this.handleBackground.bind(this);
    this.handlePrefSubmit = this.handlePrefSubmit.bind(this);
    this.cancleUpdate = this.cancleUpdate.bind(this);
    this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
    this.handleDeleteBg = this.handleDeleteBg.bind(this);
  }

  handleProfile(e) {
    this.setState({
      newProfile: e.target.files[0]
    });
  }

  handleBackground(e) {
    this.setState({
      newBg: e.target.files[0]
    });
  }

  cancleUpdate(e) {
    this.setState({
      newProfile: null,
      newBg: null
    });
  }

  handleDeleteProfile(e) {
    var apiEndpoint = '/api/preferences/'+this.state.pref_id;
    var updateData = { profile_img: null };
    var config = {
      'headers' : {
        'Authorization': 'Token ' + this.state.token,
        'Content-Type': 'application/json'
      }
    }
    axios.patch(apiEndpoint, updateData, config).then(
      this.setState({
        curProfile: '',
      })
    ).catch(err => console.log(err.response));
  }

  handleDeleteBg(e) {
    var apiEndpoint = '/api/preferences/'+this.state.pref_id;
    var updateData = { background_img: null };
    var config = {
      'headers' : {
        'Authorization': 'Token ' + this.state.token,
        'Content-Type': 'application/json'
      }
    }
    axios.patch(apiEndpoint, updateData, config).then(
      this.setState({
        curBg: '',
      })
    ).catch(err => console.log(err.response));
  }

  handlePrefSubmit(e) {
    var apiEndpoint = '/api/preferences/'+this.state.pref_id;
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
        curProfile: this.state.newProfile ? this.state.newProfile.name : this.state.curProfile,
        curBg: this.state.newBg ? this.state.newBg.name : this.state.curBg,
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
          pref_id: users.id,
          curProfile: users.profile_img,
          curBg: users.background_img,
          media_prefix: users.media_prefix
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.pref_id === '') {
      return <div> </div>
    }
    const { classes, parentClasses } = this.props;
    var user = this.state.username;
    var profile_pic = this.state.baseURL + '/' + this.state.media_prefix + this.state.curProfile;
    var previewContainer = null;
    if (parentClasses !== undefined) {
      previewContainer = parentClasses.previewContainer
    }

    return(
    	<Card className={clsx(classes.content, previewContainer)}>
        <Grid container>
          <Grid item sm={3}>
          <CardMedia
            className={classes.media}
            image={profile_pic}
          />
          </Grid>
          <Grid item sm={9}>
          <CardContent className={classes.info}>
            <Typography variant="h2" component="h2" className={classes.username}>
              @{user}
            </Typography>
            <Grid container> 
            <Grid item sm={6}> 
            <FormControl>
                <span className={classes.uploadWrapper}>
                <IconButton className={classes.action} aria-label="Delete" onClick={this.handleDeleteProfile}>
                  <DeleteIcon/>
                </IconButton>
                <span className={classes.noMargin}>Profile Picture</span>
                <Input
                  disableUnderline={true}
                  type="file"
                  name="profile"
                  className={classes.fileUpload}
                  onChange={this.handleProfile}
                  value={this.state.newProfile ? this.state.newProfile.value : ''}/></span>
            </FormControl>
            </Grid>
            <Grid item sm={6}> 
            <FormControl>
              <span className={classes.uploadWrapper}>
                <IconButton className={classes.action} aria-label="Delete" onClick={this.handleDeleteBg}>
                  <DeleteIcon/>
                </IconButton>
                <span className={classes.noMargin}>Background Image</span> 
                <Input
                  disableUnderline={true}
                  type="file"
                  name="background"
                  className={classes.fileUpload}
                  onChange={this.handleBackground}
                  value={this.state.newBg ? this.state.newBg.value : ''}/></span>
            </FormControl>
            </Grid>
            </Grid>
            <div className={classes.prefButtons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handlePrefSubmit}>
                <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.cancleUpdate}>
                <ClearIcon className={classes.leftIcon} />
                Cancel
              </Button>
            </div>
          </CardContent>
          </Grid>
        </Grid>
    	</Card>
    );
  }
}

export default withStyles(PreferenceCardStyles)(PreferenceCard);
