import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Layout as DashboardLayout } from 'dashboard';

// Custom components
import {
  NeedsAttention,
  KeepItUp,
  Recently,
  TotalRedirects,
  DailyRedirectsChart,
  SalesChart,
  RedirectTable,
  DevicesChart,
} from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  item: {
    height: '100%',
    minWidth: '225px',
  },
  gridContainer: {
    marginTop: 64,
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateLimit: '7days',
      start_date: null,
      end_date: null,
    }
  }

  updateDateLimit = (dateLimit) => {
    this.setState({ dateLimit: dateLimit });
    // console.log('Dashboard Updated DateLimit: ', dateLimit)
  }

  updateStartEndDates = (start_date, end_date) => {
    this.setState({ start_date: start_date, end_date: end_date });
    // console.log('Dashboard Updated updateStartEndDates: ', dateLimit)
  }

  render() {
    const { classes, onChange, isOpen } = this.props;

    return (
      <DashboardLayout 
        title="Dashboard" 
        isOpen={isOpen} 
        onChange={onChange}
        updateDateLimit={this.updateDateLimit}
        updateStartEndDates={this.updateStartEndDates}>
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
            className={classes.gridContainer}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <NeedsAttention className={classes.item} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <KeepItUp className={classes.item} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Recently className={classes.item} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalRedirects className={classes.item} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <DailyRedirectsChart 
                className={classes.item} 
                dateLimit={this.state.dateLimit}
                start_date={this.state.start_date}
                end_date={this.state.end_date}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <RedirectTable 
                className={classes.item} 
                dateLimit={this.state.dateLimit}
                start_date={this.state.start_date}
                end_date={this.state.end_date}
              />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <SalesChart className={classes.item} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <DevicesChart className={classes.item} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
