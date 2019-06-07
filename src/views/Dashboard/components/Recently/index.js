import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import {
  InsertChartOutlined as InsertChartIcon,
  Today as TodayIcon,
} from '@material-ui/icons';

// Shared components
import { Paper } from 'dashboard';

// Component styles
import styles from './styles';

class Progress extends Component {
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
              RECENTLY
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              299,749 clicks
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <InsertChartIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer}>
          <Typography
            className={classes.difference}
            variant="body2"
          >
            <TodayIcon />
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            in the past 31 days
          </Typography>
        </div>
      </Paper>
    );
  }
}

Progress.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Progress);
