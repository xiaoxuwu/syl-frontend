import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Switch } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from 'dashboard';

// Component styles
import styles from './styles';

import SylLineChart from 'components/SylLineChart';
import SylBarChart from 'components/SylBarChart';
import axios from 'components/AxiosClient';

class DailyRedirectsChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewsVsTime: [],
      raw: [],
      totalViewCount: 0,
      useLineChart: true,
    }
  }
  
  componentDidMount() {
    this.updateLimitData(this.props.dateLimit)
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateLimit !== prevProps.dateLimit) {
      this.updateLimitData(this.props.dateLimit);
    } else if (this.props.start_date !== prevProps.start_date || this.props.end_date !== prevProps.end_date) {
      this.updateStartEndData(this.props.start_date, this.props.end_date)
    }
  } 

  updateLimitData = (limit) => {
    // console.log('DailyRedirectsChart Updated Data: ', limit)
    axios.get('/api/events/stats', {
      params: {
        'time': 'daily',
        'limit': limit
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      var viewsVsTime = res.data.data.map(period => {
        return {name: period.period.substring(0, 10), 'Redirects' : period.count}
      });
      this.setState({
        viewsVsTime: viewsVsTime,
        raw: res.data.raw,
        totalViewCount: res.data.raw.length
      });
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  updateStartEndData = (start_date, end_date) => {
    // console.log('DailyRedirectsChart Updated Data: ', limit)
    axios.get('/api/events/stats', {
      params: {
        'time': 'daily',
        'start': start_date,
        'end': end_date,
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      var viewsVsTime = res.data.data.map(period => {
        return {name: period.period.substring(0, 10), 'Redirects' : period.count}
      });
      this.setState({
        viewsVsTime: viewsVsTime,
        raw: res.data.raw,
        totalViewCount: res.data.raw.length
      });
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  handleChange = name => event => {
    this.setState({ 
      [name]: event.target.checked 
    });
  };

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel title="Daily Traffic" />
          <Switch
            checked={this.state.useLineChart}
            onChange={this.handleChange('useLineChart')}
            value="cheuseLineChartckedB"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </PortletHeader>
        <PortletContent className={classes.portletWrapper}>
            {this.state.useLineChart ? <SylLineChart data={this.state.viewsVsTime} dataKey="Redirects"/> : <SylBarChart data={this.state.viewsVsTime} dataKey="Redirects"/> }
        </PortletContent>
      </Portlet>
    );
  }
}

DailyRedirectsChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DailyRedirectsChart);
