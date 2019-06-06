import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PreviewStyles from '../styles/Preview.js'
import Links from './Links'

class Preview extends Component {
  render() {
    const { classes } = this.props;
    let username = localStorage.getItem('username');
    return(
      <div className={classes.wrapper}>
        <section className={classes.preview}>
          <div className={classes.previewTitle}>Live Preview</div>
          <div className={classes.inner}>
            <div className={classes.previewWrap}>
              <div className={classes.previewInner}>
                <Links username={username}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default withStyles(PreviewStyles)(Preview);
