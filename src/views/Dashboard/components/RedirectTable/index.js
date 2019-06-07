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

import axios from 'components/AxiosClient';

class RedirectTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    }
  }
  
  componentDidMount() {
    this.getData(this.props.dateLimit)
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateLimit != prevProps.dateLimit) {
      this.getData(this.props.dateLimit);
    }
  } 

  // Get event counts per day for authenticated user
  getData = (limit) => {
    console.log('RedirectTable Updated Data: ', limit)
    axios.get('/api/events/stats', {
      params: {
        'method': 'count',
        'time': 'daily',
        'limit': limit,
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      var data = res.data.data.map(period => {
        let d = moment(period.period).format('LL')
        return {date: d, 'redirects' : period.count}
      });
      this.setState({
        rows: data,
      });
      console.log(res.data)
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { classes, dateLimit, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PerfectScrollbar className={classes.scrollbarContainer}>
          <EnhancedTable rowData={this.state.rows} />
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

RedirectTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RedirectTable);
