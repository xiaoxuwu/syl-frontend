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
import {setToken, authenticate} from './auth/AuthService'


class CreateAccount extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location.search);
    this.state = {
      code: params.get('code'),
      ig_token: "",
      username: "fetching instagram username...",
      password: "",
      profile_img: "",
      name: "",
      errMsg: ""
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
        name: res.data['user']['full_name']
      })})
      .catch(err => {
        console.log(err.response)
        this.setState({
          errMsg: "Error talking to Instagram"
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
      setToken(res)
      this.props.setLoginCallback(true)
    })
    .catch((err) => {
      console.log(err.response)
      if (err.response.status === 400) {
        this.setState(() => ({
          errMsg: err.response.data.details
        }))
      }
    })
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
            Sign up
          </Typography>
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
