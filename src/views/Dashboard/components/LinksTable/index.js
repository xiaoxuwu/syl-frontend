import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';

// Mock data
import orders from 'data/orders';
import users from 'data/users';

import EnhancedTable from './table';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  Status
} from 'dashboard';

// Component styles
import styles from './styles';

function lookupOrder(order) {
  order.customer = users.find(user => user.id === order.customer);

  return order;
}

export const getOrders = (limit = 6) => {
  return new Promise(resolve => {
    const ordersLookup = JSON.parse(JSON.stringify(orders))
      .slice(0, limit)
      .map(lookupOrder);

    setTimeout(() => {
      resolve({
        orders: ordersLookup,
        ordersTotal: orders.length
      });
    }, 700);
  });
};


const statusColors = {
  delivered: 'success',
  pending: 'info',
  refund: 'danger'
};

class LinksTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    orders: [],
    ordersTotal: 0
  };

  async getOrders(limit) {
    try {
      this.setState({ isLoading: true });

      const { orders, ordersTotal } = await getOrders(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          orders,
          ordersTotal
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getOrders(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, orders, ordersTotal } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && orders.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PerfectScrollbar className={classes.scrollbarContainer}>
          <EnhancedTable />
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

LinksTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinksTable);
