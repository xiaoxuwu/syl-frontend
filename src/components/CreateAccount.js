import axios from './AxiosClient';
import React, { Component } from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
<<<<<<< HEAD
import TextField from '@material-ui/core/TextField';
=======
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
>>>>>>> Instagram redirect stuff
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SylSnackBar from './SylSnackBar';
import LoginStyles from '../styles/Login'
<<<<<<< HEAD
import {setToken, authenticate} from './auth/AuthService'
=======
import {setToken, createUser} from './auth/AuthService'
>>>>>>> Instagram redirect stuff


class CreateAccount extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location.search);
    this.state = {
      code: params.get('code'),
<<<<<<< HEAD
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
=======
      username: "",
      password: "",
      errMsg: ""
    };
  }

  getIGUsername(state) {
>>>>>>> Instagram redirect stuff
    let config = {
      params: {
        code: state['code']
      },
    }
<<<<<<< HEAD
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
=======
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
>>>>>>> Instagram redirect stuff
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
<<<<<<< HEAD
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
      setToken(res)
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
=======
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
>>>>>>> Instagram redirect stuff
  }

  render() {
    const { classes, getLoginCallback } = this.props;

    // if already logged in, redirect to home
    if (getLoginCallback()) {
      return <Redirect to='/influencer/' />
    }

    let errorSnackBar = null
<<<<<<< HEAD
=======
    console.log(this.state.errMsg)
>>>>>>> Instagram redirect stuff
    if (this.state.errMsg !== '') {
      errorSnackBar = <SylSnackBar
        onClose={this.handleSnackClose}
        variant="warning"
        className={classes.margin}
        message={this.state.errMsg}
      />
    }

<<<<<<< HEAD
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

=======
>>>>>>> Instagram redirect stuff
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
<<<<<<< HEAD
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
=======
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
>>>>>>> Instagram redirect stuff
                disabled
                value={this.state.username}
                autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
<<<<<<< HEAD
              <TextField
                name="password_syl"
                type="password"
                label="New Password"
                id="password"
                variant="outlined"
=======
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password_syl"
                type="password"
                id="password"
>>>>>>> Instagram redirect stuff
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormControl>
<<<<<<< HEAD
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
=======
>>>>>>> Instagram redirect stuff
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
