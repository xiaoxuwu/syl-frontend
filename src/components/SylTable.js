import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  header: {
    fontSize: 18
  },
  rowContent: {
    fontSize: 18
  }
};

class SylTable extends React.Component {
  
  render() {
    const { classes, data } = this.props;

    return (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header} align="right">Time Clicked</TableCell>
              <TableCell className={classes.header} align="right">Link</TableCell>
              <TableCell className={classes.header} align="right">Order</TableCell>
              <TableCell className={classes.header} align="right">Link Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => (
              <TableRow key={n[0]}>
                <TableCell className={classes.rowContent} align="right">{n[1]}</TableCell>
                <TableCell className={classes.rowContent} align="right">{n[2]}</TableCell>
                <TableCell className={classes.rowContent} align="right">{n[3]}</TableCell>
                <TableCell className={classes.rowContent} align="right">{n[4]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
  }
}

SylTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SylTable);
