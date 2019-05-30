import React, { Component } from 'react';
import { Redirect } from 'react-router';
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
import SylSnackBar from '../SylSnackBar';
import LoginStyles from '../../styles/Login'
import {authenticate, setToken} from './AuthService'
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { spacing } from '@material-ui/system';


class Login extends Component {
  constructor(props) {
    super(props);

    loadCSS(
      'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    this.state = {
      username: "",
      password: "",
      errMsg: "",
    };
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
        // store token on success
        setToken(res)
        this.props.setLoginCallback(true)
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
    let client_id = 'f296ed176092447582392cbec8f2d914'
    let redirect_uri = 'http://localhost:3000/influencer/create_account'
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
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

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
          <Button
            onClick={this.redirectToIG}
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            <Icon className={clsx(classes.icon, classes.mr, 'fab fa-instagram')} />
            Connect with Instagram
          </Button>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(LoginStyles)(Login);
