import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

import EnhancedTable from './table';

// Shared components
import {
  Portlet
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
    this.getLimitData(this.props.dateLimit)
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateLimit !== prevProps.dateLimit) {
      this.getLimitData(this.props.dateLimit);
    } else if (this.props.start_date !== prevProps.start_date || this.props.end_date !== prevProps.end_date) {
      this.getStartEndData(this.props.start_date, this.props.end_date)
    }
  } 

  // Get event counts per day for authenticated user
  getLimitData = (limit) => {
    // console.log('RedirectTable Updated Data: ', limit)
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

  getStartEndData = (start_date, end_date) => {
    // console.log('RedirectTable Updated Data: ', limit)
    axios.get('/api/events/stats', {
      params: {
        'method': 'count',
        'time': 'daily',
        'start': start_date,
        'end': end_date,
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
    const { classes, className } = this.props;
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
