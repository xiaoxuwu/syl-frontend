import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const NotFound = () => (
    <div>
        <center><Typography component="h2" variant="display3" gutterBottom>
        404: Requested URL was Not Found 
        </Typography></center>
        <center><Link href="/" variant="body1">
            Return to Home
      </Link></center>
    </div>
);

export default NotFound;