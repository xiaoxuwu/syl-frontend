import axios from './AxiosClient';
import React, { Component } from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SylSnackBar from './SylSnackBar';
import LoginStyles from '../styles/Login'
import {setToken, createUser} from './auth/AuthService'


class CreateAccount extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location.search);
    this.state = {
      code: params.get('code'),
      username: "",
      password: "",
      errMsg: ""
    };
  }

  getIGUsername(state) {
    let config = {
      params: {
        code: state['code']
      },
    }
    var resp = axios.get('/api/users/ig_response', config)
    console.log(resp)
    return resp.json()['user']['username']
  }

  componentDidMount() {
    this.getIGUsername(this.state)
      .then(res => {
        document.getElementById('username').value = res
      })
      .catch(err => {
        this.setState(() => ({
          errMsg: "Problem authenticating with Instagram."
        }))
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
    createUser(this.state)
      .then(res => {
        // store token on success
        setToken(res)
        this.props.setLoginCallback(true)
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.setState(() => ({
            errMsg: "Problem authenticating with Instagram."
          }))
        }
      });
  }

  render() {
    const { classes, getLoginCallback } = this.props;

    // if already logged in, redirect to home
    if (getLoginCallback()) {
      return <Redirect to='/influencer/' />
    }

    let errorSnackBar = null
    console.log(this.state.errMsg)
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
            Sign up
          </Typography>
          {errorSnackBar}
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username_syl"
                autoComplete="username"
                disabled
                value={this.state.username}
                autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password_syl"
                type="password"
                id="password"
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
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(LoginStyles)(CreateAccount);
