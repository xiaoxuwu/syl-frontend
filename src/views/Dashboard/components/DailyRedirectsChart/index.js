import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Material icons
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowRight as ArrowRightIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  PortletFooter
} from 'dashboard';

// Component styles
import styles from './styles';

import SylLineChart from 'components/SylLineChart';
import axios from 'components/AxiosClient';

class DailyRedirectsChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewsVsTime: [],
      raw: [],
      totalViewCount: 0,
    }
  }
  
  componentDidMount() {
    this.updateData(this.props.dateLimit)
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateLimit != prevProps.dateLimit) {
      this.updateData(this.props.dateLimit);
    }
  } 

  updateData = (limit) => {
    console.log('DailyRedirectsChart Updated Data: ', limit)
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
        </PortletHeader>
        <PortletContent className={classes.portletWrapper}>
            <SylLineChart data={this.state.viewsVsTime} dataKey="Redirects"/>
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
