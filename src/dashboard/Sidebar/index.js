import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'components/AxiosClient';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
} from '@material-ui/icons';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Component styles
import styles from './styles';

import LogoImage from '../../assets/images/syl-logo-color.svg'

import InfiniteCalendar, {
  Calendar,
  withRange,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

const CalendarWithRange = withRange(Calendar);

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username'),
      links_url: '/links/' + localStorage.getItem('username'),
      profile_pic: null,
      base_url: process.env.REACT_APP_API_URL,
      dateLimit: '7days',
      start_date: new Date(2019, 6, 1),
      end_date: new Date(),
    };
  }

  componentDidMount() {
    this.getPreferences();
  }

  // Makes GET requests to retrieve user profile and background picture
  getPreferences = () => {
    var apiEndpoint = '/api/preferences/?username=' + this.state.username;
    axios.get(apiEndpoint, {})
      .then(result => {
        let userPref = result.data;

        this.setState({ 
          profile_pic: this.state.base_url + '/' + userPref.media_prefix + userPref.profile_img,
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    if (event.target.value !== 'custom') {
      this.props.updateDateLimit(event.target.value)
    }
    // console.log('Sidebar Updated DateLimit: ', event.target.value)
  }

  onCalendarSelect = (e) => {
    console.log(e.start)
    console.log(e.end)
    // 3 means has selected range (start and end)
    if (e.eventType === 3) {
      this.setState({
        start_date: e.start,
        end_date: e.end,
      })
      this.props.updateStartEndDates(e.start, e.end)
    }
  }

  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/influencer"
          >
            <img
              alt="SYL logo"
              className={classes.logoImage}
              src={LogoImage}
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to={this.state.links_url}>
            <Avatar
              alt={this.state.username}
              className={classes.avatar}
              src={this.state.profile_pic}
            />
          </Link>
          <Typography
            className={classes.nameText}
            variant="h6"
          >
            @{this.state.username}
          </Typography>
        </div>
        <Divider className={classes.profileDivider} />
        <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/influencer/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/influencer/dashboard/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Users"
            />
          </ListItem>
        </List>
        <Divider className={classes.profileDivider} />
        <Typography
          variant="h5"
        >
          See data for the past:
        </Typography>
        <FormControl variant="outlined" className={classes.select}>
          <Select
            native
            onChange={this.handleChange}
            input={
              <OutlinedInput id="dateLimit" labelWidth={0}/>
            }
            >
            <option value="7days">7 days</option>
            <option value="30days">30 days</option>
            <option value="90days">90 days</option>
            <option value="custom">custom date range</option>
          </Select>
        </FormControl>
        <div style={{display: this.state.dateLimit === 'custom' ? 'block': 'none'}}>
          <InfiniteCalendar   
            className={classes.calendar}
            Component={CalendarWithRange}
            width={270}
            height={300}
            displayOptions={{
              showOverlay: true,
              showHeader: false,
            }}
            selected={{
              start: this.state.start_date,
              end: this.state.end_date,
            }}
            min={new Date(2018, 1, 1)}
            max={new Date()}
            minDate={new Date(2018, 1, 1)}
            maxDate={new Date()}
            locale={{
              headerFormat: 'MMM Do',
            }}
            onSelect={this.onCalendarSelect}
          />
        </div>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
