import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};
function SylTable (props) {
  const { classes, data } = props;

  return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Time Clicked</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Link Text</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              <TableCell align="right">{n[1]}</TableCell>
              <TableCell align="right">{n[2]}</TableCell>
              <TableCell align="right">{n[3]}</TableCell>
              <TableCell align="right">{n[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}

SylTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SylTable);
