import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

// Shared components
import { Portlet, PortletContent } from 'dashboard';
import Download from 'components/Download';

// Component styles
import styles from './styles';

import SimplePopover from './popover';

class LinksTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  checkLinkFields = (title, img) => {
    if (!title && !img) {
      return 'Links with titles and images perform better'
    } else if (!title) {
      return 'Links with titles perform better'
    } else if (!img) {
      return 'Links with images perform better'
    } else {
      return ''
    }
  }

  render() {
    const { classes, className, links } = this.props;
    const { rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" className={classes.padLeft}>Title</TableCell>
                  <TableCell align="left">Date Created</TableCell>
                  <TableCell align="left">URL</TableCell>
                  <TableCell align="left">Clicks</TableCell>
                  <TableCell align="left">Tips</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {links.slice(0, rowsPerPage)
                  .map(link => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={link.id}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Avatar
                            className={classes.avatar}
                            src={link.img ? process.env.REACT_APP_API_URL + '/' + link.media_prefix + link.img : null}
                          ></Avatar>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {link.title}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(link.date).format('LL')}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {link.url}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {link.count}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {!link.title || !link.img ? <SimplePopover message={this.checkLinkFields(link.title, link.img)}/> : null}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <div className={classes.tableEnd}>
            <Download isLink={true} className={classes.download} />
            <TablePagination
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              component="div"
              count={links.length}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              className={classes.pagination}
            />
          </div>
        </PortletContent>
      </Portlet>
    );
  }
}

LinksTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onShowDetails: PropTypes.func,
  links: PropTypes.array.isRequired
};

LinksTable.defaultProps = {
  links: [],
  onShowDetails: () => {}
};

export default withStyles(styles)(LinksTable);
