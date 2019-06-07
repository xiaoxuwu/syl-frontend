import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

import {
  BarChart, Bar
} from 'recharts';

class SylBarChart extends React.Component {

  render() {
    const { data, dataKey } = this.props;

    return (
      <ResponsiveContainer width="99%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#ff6666" legendType="none" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default SylBarChart;
