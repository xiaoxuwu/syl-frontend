import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import { TrendingUp as TrendingUpIcon } from '@material-ui/icons';

// Shared components
import { Paper } from 'dashboard';

// Component styles
import styles from './styles';

import axios from 'components/AxiosClient';

class TotalRedirects extends Component {
  state = {
    totalClickCount: 0,
  };

  componentDidMount() {
    this.updateData()
  }

  updateData = () => {
    axios.get('/api/events/stats', {
      params: {
        'method': 'count',
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      this.setState({
        totalClickCount: res.data.count,
      });
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="body2"
            >
              ALL TIME
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              {this.state.totalClickCount} clicks
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <TrendingUpIcon className={classes.icon} />
          </div>
        </div>
      </Paper>
    );
  }
}

TotalRedirects.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TotalRedirects);
