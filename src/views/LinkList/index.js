import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Shared layouts
import { Layout as DashboardLayout } from 'dashboard';

// Custom components
import { LinksTable } from './components';

// Component styles
import styles from './style';

// Shared components
import {
  PortletHeader,
} from 'dashboard';

import axios from 'components/AxiosClient';

class LinkList extends Component {

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

  renderLinks() {
    return (
      <div>
        <LinksTable
          links={this.state.links}
        />
      </div>
    );
  }

  render() {
    const { classes, onChange, isOpen } = this.props;
    
    return (
      <DashboardLayout title="Links" isOpen={isOpen} onChange={onChange}>
        <PortletHeader noDivider className={classes.header}>
          <Typography variant="h3" className={classes.titleLabel}>Active Links</Typography>
        </PortletHeader>
        <div className={classes.root}>
          <div className={classes.content}>{this.renderLinks()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

LinkList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinkList);
