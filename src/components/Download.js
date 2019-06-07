import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import DownloadStyles from '../styles/Download.js';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import axios from './AxiosClient';

class Download extends Component {

  downloadEventData = () => {
    axios.get('/api/events/stats', {
      params: {
        'method': 'count',
        'time': 'daily'
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      this.downloadCSV(res.data.raw_csv, "event_data.csv")
    }).catch(err => {
      console.log(err)
    })
  }

  downloadLinkData = () => {
    axios.get('/api/events/stats', {
      params: {
        'method': 'links',
      },
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(res => {
      this.downloadCSV(res.data.raw_csv, "link_data.csv")
    }).catch(err => {
      console.log(err)
    })
  }

  downloadCSV = (raw_csv, filename) => {
    let csvContent = "data:text/csv;charset=utf-8," + raw_csv;

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    link.click();
  }

  render() {
    const { classes, isLink } = this.props;
    return(
      <SaveAltRoundedIcon onClick={isLink ? this.downloadLinkData : this.downloadEventData} className={classes.icon} />
    )
  }
}

export default withStyles(DownloadStyles)(Download);
