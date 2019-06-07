import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SylSnackBar from '../SylSnackBar';
import LoginStyles from '../../styles/Login'
import {authenticate, setToken, getUserInfo, setUserInfo} from './AuthService'
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import LogoImage from '../../assets/images/logo-color.svg'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errMsg: "",
    };
    if (this.props.location.state !== undefined && this.props.location.state.errMsg !== '') {
      this.state.errMsg = this.props.location.state.errMsg
    }
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
    authenticate(this.state)
      .then(res => {
        // Get username then store username + token on success
        getUserInfo(res.data.token)
          .then(result => {
            let user = result.data;
            setUserInfo(res.data.token, user.username)
            this.props.setLoginCallback(true)
          })
          .catch(err => {
            setToken(res)
            this.setState(() => ({
              errMsg: "Unable to retrieve username."
            }))
            this.props.setLoginCallback(true)
          })
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.setState(() => ({
            errMsg: "Wrong username or password."
          }))
        }
      });
  }

  redirectToIG = event => {
    const redirect_uri = process.env.REACT_APP_FRONTEND_URL + '/influencer/create_account'
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code`
  }

  render() {
    const { classes, getLoginCallback } = this.props;

    // if already logged in, redirect to home
    if (getLoginCallback()) {
      return <Redirect to='/influencer/edit/' />
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

    return (
      <div className={classes.background}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img
                src={LogoImage}
                className={classes.logo}
                alt="logo"
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {errorSnackBar}
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="username"
                  name="username_syl"
                  autoComplete="username"
                  variant="outlined"
                  label="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  name="password_syl"
                  type="password"
                  id="password"
                  variant="outlined"
                  label="Password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.signIn}
              >
                Sign in
              </Button>
            </form>
            <Button
              onClick={this.redirectToIG}
              fullWidth
              variant="contained"
              className={classes.instagram}
            >
              <Icon className={clsx(classes.icon, classes.mr, 'fab fa-instagram')} />
              Sign Up with Instagram
            </Button>
          </Paper>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(LoginStyles)(Login);
