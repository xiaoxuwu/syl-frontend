import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { mainListItems, secondaryListItems } from './ListItems';
import SylLineChart from './SylLineChart';
import SylTable from './SylTable';
import DashboardStyles from '../styles/Dashboard'
import axios from './AxiosClient';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';

class Dashboard extends React.Component {
  state = {
    open: true,
    viewsVsTime: [],
    raw: [],
    userPref: {},
    username: localStorage.getItem('username'),
    date_limit: '',
    totalViewCount: 0
  };

  getPreferences = () => {
    var apiEndpoint = '/api/preferences/?username=' + this.state.username;
    axios.get(apiEndpoint, {})
      .then(result => {
        let userPref = result.data;

        this.setState({ 
          userPref: userPref,
        });
      })
      .catch(err => console.log(err));
  }

  updateData(limit) {
    axios.get('/api/events/stats', {
      params: {
        'time': 'daily',
        'limit': limit
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      var viewsVsTime = res.data.data.map(period => {
        return {name: period.period.substring(0, 10), 'Visits' : period.count}
      });
      this.setState({
        viewsVsTime: viewsVsTime,
        raw: res.data.raw,
        totalViewCount: res.data.raw.length
      });
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(event.target.id)
    if (event.target.id == 'date_limit') {
      this.updateData(event.target.value)
    }
  }

  componentDidMount() {
    this.updateData('7days')
    this.getPreferences();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    var user = this.state.username;
    var userPref = this.state.userPref;
    var profile_pic = process.env.REACT_APP_API_URL + '/' + userPref.media_prefix + userPref.profile_img;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <img
            src={profile_pic}
            className={classes.profilePic}
            alt="link"
          />
          <Typography variant="h5" component="h5" className={classes.usernameText}>
            @{user}
          </Typography>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.topFilterWrapper}>
            <FormControl variant="outlined" className={classes.select}>
                <Select
                  native
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput id="date_limit" labelWidth={0}/>
                  }
                  >
                  <option value="7days">last week</option>
                  <option value="30days">last month</option>
                  <option value="90days">last 3 months</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.select}>
                <Select
                  native
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput id="link_limit" labelWidth={0}/>
                  }
                  >
                  <option value="all">all links</option>
                  <option value="link1">link 1</option>
                  <option value="link2">link 2</option>
              </Select>
            </FormControl>
          </div>
          <Grid container className={classes.root}>
              <Grid item sm={2} xs={6} className={clsx(classes.topContentWrapper, classes.noLeftPadding)}>
                <Card elevation={0} className={clsx(classes.contentCard, classes.fullHeight)}>
                  <Grid container className={classes.contentHeader} spacing={8}>
                    <Typography variant="h6" gutterBottom component="h2" className={classes.contentHeaderText}>
                      Total Clicks
                    </Typography>
                  </Grid>
                  <Typography variant="h1" gutterBottom component="h1" className={classes.highlightText}>
                    {this.state.totalViewCount}
                  </Typography>
                </Card>
              </Grid>
              <Grid item sm={4} xs={6} className={classes.topContentWrapper}>
                <Card elevation={0} className={clsx(classes.contentCard, classes.fullHeight)}>
                  <Grid container className={classes.contentHeader} spacing={8}>
                    <Typography variant="h6" gutterBottom component="h2" className={classes.contentHeaderText}>
                      Top Links
                    </Typography>
                  </Grid>
                </Card>
              </Grid>
              <Grid item sm={6} xs={12} className={clsx(classes.topContentWrapper, classes.noRightPadding)}>
              <Card elevation={0} className={clsx(classes.contentCard, classes.fullHeight)}>
                  <Grid container className={classes.contentHeader} spacing={8}>
                    <Typography variant="h6" gutterBottom component="h2" className={classes.contentHeaderText}>
                      Traffic by Hour
                    </Typography>
                  </Grid>
                </Card>
              </Grid>
          </Grid>
          <Card elevation={0} className={classes.contentCard}>
            <Grid container className={classes.contentHeader}>
              <Grid item sm={10} xs={8}>
              <Typography variant="h6" gutterBottom component="h2" className={classes.contentHeaderText}>
                Traffic by Day
              </Typography>
              </Grid>
            </Grid>
            <CardContent><SylLineChart data={this.state.viewsVsTime}/></CardContent>
          </Card>
          <Card elevation={0} className={(classes.contentCard, classes.rawWrapper)}>
            <Grid container className={classes.contentHeader}>
              <Grid item sm={10} xs={8}>
              <Typography variant="h6" gutterBottom component="h2" className={classes.contentHeaderText}>
                Raw Data
              </Typography>
              </Grid>
            </Grid>
            <CardContent>
              <div className={classes.tableContainer}>
                <SylTable data={this.state.raw}/>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(DashboardStyles)(Dashboard);
