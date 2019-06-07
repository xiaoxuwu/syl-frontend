import React, { Component, Fragment } from 'react';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, withWidth } from '@material-ui/core';

// Material components
import { Drawer } from '@material-ui/core';

// Custom components
import { Sidebar } from 'dashboard';

// Component styles
import styles from './styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: this.props.isOpen,
      dateLimit: '7days',
      start_date: null,
      end_date: null,
    };
    // console.log('dashboard: ', this.state.isOpen)
  }

  handleClose = (isOpen) => {
    // console.log('handleClose og, state: ', this.state.isOpen, ', prop: ', isOpen)
    if (isOpen) {
      this.setState({ isOpen: false }, function () {
        // console.log('handleClose new state: ', this.state.isOpen)
        this.props.onChange(this.state.isOpen)
      });
    }
  };

  getDateLimit = (dateLimit) => {
    this.setState({ dateLimit: dateLimit });
    this.props.updateDateLimit(dateLimit);
    // console.log('Layout Updated DateLimit: ', dateLimit)
  }

  getStartEndDates = (start_date, end_date) => {
    this.setState({ start_date: start_date, end_date: end_date });
    this.props.updateStartEndDates(start_date, end_date);
    // console.log('Layout Updated getStartEndDates: ', dateLimit)
  }

  render() {
    const { classes, isOpen, width, children } = this.props;
    const isMobile = ['xs', 'sm', 'md'].includes(width);
    const shiftContent = isOpen && !isMobile;

    return (
      <Fragment>
        <Drawer
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          onClose={() => this.handleClose(isOpen)}
          open={isOpen}
          variant={isMobile ? 'temporary' : 'persistent'}
        >
          <Sidebar 
            className={classes.sidebar} 
            updateDateLimit={this.getDateLimit} 
            updateStartEndDates={this.getStartEndDates} 
          />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: shiftContent
          })}
        >
          {children}
        </main>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth()
)(Dashboard);
