import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Layout as DashboardLayout } from 'dashboard';

// Shared services
// import { getUsers } from 'services/user';
// Mock data
import users from 'data/users';
import orders from 'data/orders';


// Custom components
import { UsersToolbar, UsersTable } from './components';

// Component styles
import styles from './style';

// Shared components
import {
  PortletHeader,
  PortletLabel,
} from 'dashboard';

import axios from 'components/AxiosClient';

class UserList extends Component {

  state = {
    links: [],
  };

  componentDidMount() {
    this.getLinks()
  }

  getLinks = () => {
    axios.get('/api/events/stats', {
      params: {
        'method': 'links',
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      this.setState({
        links: res.data.data,
      });
      console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  renderUsers() {
    const { classes } = this.props;

    return (
      <div>
        <UsersTable
          links={this.state.links}
        />
      </div>
    );
  }

  render() {
    const { classes, onChange, isOpen } = this.props;
    
    return (
      <DashboardLayout title="Users" isOpen={isOpen} onChange={onChange}>
        <PortletHeader noDivider className={classes.header}>
          <Typography variant="h3" className={classes.titleLabel}>Active Links</Typography>
        </PortletHeader>
        <div className={classes.root}>
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
