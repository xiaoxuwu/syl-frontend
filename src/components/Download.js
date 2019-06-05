import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from './AxiosClient';

class Download extends Component {

  downloadCSV = () => {
    const rows = [
      ["name1", "city1", "some other info"],
      ["name2", "city2", "more info"]
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    // let csvContent = "data:text/csv;charset=utf-8," 
    // + rows.map(e => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);

    link.click();
  };

  render() {
    return(
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={this.downloadCSV}
      >
        Download
      </Button>
      )
  }
}

export default Download;
