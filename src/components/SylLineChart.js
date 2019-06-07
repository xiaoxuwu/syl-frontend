import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

class SylLineChart extends React.Component {
  
  render() {
    const { data } = this.props;
    console.log(data)

    return (
      // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={data} >
          <XAxis dataKey="name" tickLine={false} dy={15} />
          <YAxis tickLine={false} dx={-15} />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Visits" stroke="#ff6666" legendType="none" strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default SylLineChart;
