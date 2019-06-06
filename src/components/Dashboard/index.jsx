import React, { Component, Fragment } from 'react';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

// Material helpers
import { withStyles, withWidth } from '@material-ui/core';

// Material components
import { Drawer } from '@material-ui/core';

// Custom components
import { Sidebar } from 'components';

// Component styles
import styles from './styles';

// Material components
import {
  IconButton,
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import LogoImage from '../../assets/images/syl-logo-color.svg'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const isMobile = ['xs', 'sm', 'md'].includes(props.width);

    this.state = {
      isOpen: this.props.isOpen,
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
          <Sidebar className={classes.sidebar} />
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
