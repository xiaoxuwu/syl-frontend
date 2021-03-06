import axios from './AxiosClient';
import React, { Component } from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SylSnackBar from './SylSnackBar';
import LoginStyles from '../styles/Login'
import {setToken, authenticate, getUserInfo, setUserInfo} from './auth/AuthService'


class CreateAccount extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location.search);
    this.state = {
      code: params.get('code'),
      ig_token: "",
      username: "fetching instagram username...",
      password: "",
      confirm_password: "",
      profile_img: "",
      name: "",
      fetchedIGInfoSuccess: false,
      errMsg: "",
    };
  }

  getIGInfo(state) {
    let config = {
      params: {
        code: state['code']
      },
    }
    return axios.get('/api/users/ig_response', config)
  }

  componentDidMount() {
    this.getIGInfo(this.state)
      .then(res => {
        this.setState({
          ig_token: res.data['access_token'],
          username: res.data['user']['username'],
          profile_img: res.data['user']['profile_picture'],
          name: res.data['user']['full_name'],
          fetchedIGInfoSuccess: true
        })
      })
      .catch(err => {
        this.props.history.push({
          pathname: '/influencer/login',
          state: { errMsg: 'Error talking to Instagram' }
        })
      });
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // if errMsg != "", we display errMsg in output
    this.setState({ errMsg: "" });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, confirm_password } = this.state;
    var errMsg = this.validate(username, password, confirm_password);
    if (errMsg !== "") {
      return
    }
    let config = {
      token: this.state.ig_token,
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      profile_img: this.state.profile_img
    }
    let auth_config = {
      username: this.state.username,
      password: this.state.password,
      errMsg: this.state.errMsg
    }

    axios.post('/api/users/create_account/', config)
    .then((res) => {
      return authenticate(auth_config)
    })
    .then((res) => {
      // Get username then store username + token on success
      getUserInfo(res.data.token)
        .then(result => {
          let user = result.data;
          setUserInfo(res.data.token, user.username)
        })
        .catch(err => {
          setToken(res)
          this.setState(() => ({
            errMsg: "Unable to retrieve username."
          }))
        })
      this.props.setLoginCallback(true)
    })
    .catch((err) => {
      this.props.history.push({
        pathname: '/influencer/login',
        state: { errMsg: err.response.data.details }
      })
    })
  }

  validate(username, password, confirm_password) {
    var errMsg = ""
    if (username === "fetching instagram username..." || password === '' || confirm_password === '') {
      errMsg = "All fields must be filled out"
    }
    else if (password !== confirm_password) {
      errMsg = "Passwords do not match"
    }
    this.setState({errMsg: errMsg})
    return errMsg
  }

  render() {
    const { classes, getLoginCallback } = this.props;

    // if already logged in, redirect to home
    if (getLoginCallback()) {
      return <Redirect to='/influencer/' />
    }

    let errorSnackBar = null
    if (this.state.errMsg !== '') {
      errorSnackBar = <SylSnackBar
        onClose={this.handleSnackClose}
        variant="warning"
        className={classes.margin}
        message={this.state.errMsg}
      />
    }

    let icon = null
    let title = null
    if (this.state.fetchedIGInfoSuccess) {
      icon = <Avatar alt="Profile Image" src={this.state.profile_img} className={classes.bigAvatar} />
      title = (
        <Typography component="h1" variant="h5">
          {this.state.name}
        </Typography>
      )
    } else {
      icon = (
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      )
      title = (
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      )
    }

    return (
      <div className={classes.background}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            {icon}
            {title}
            {errorSnackBar}
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="username"
                  name="username_syl"
                  label="Username (from Instagram)"
                  autoComplete="username"
                  variant="outlined"
                  disabled
                  value={this.state.username}
                  autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  name="password_syl"
                  type="password"
                  label="New Password"
                  id="password"
                  variant="outlined"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  name="confirm_password_syl"
                  type="password"
                  label="Confirm Password"
                  id="confirm_password"
                  variant="outlined"
                  autoComplete="current-password"
                  value={this.state.confirm_password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(LoginStyles)(CreateAccount);
