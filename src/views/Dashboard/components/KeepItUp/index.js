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
  ArrowUpward as ArrowUpwardIcon,
  Mouse as MouseIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'dashboard';

// Component styles
import styles from './styles';

class KeepItUp extends Component {
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
              KEEP IT UP
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              6969 clicks
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <MouseIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer}>
          <Typography
            className={classes.difference}
            variant="body2"
          >
            <ArrowUpwardIcon />
            x3 engagement
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            on your top link
          </Typography>
        </div>
      </Paper>
    );
  }
}

KeepItUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KeepItUp);
