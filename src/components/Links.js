import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ListStyles from '../styles/Links.js';

import LinkCard from '../components/LinkCard.js';

import IMG0 from './IMG0.png';
import IMG1 from './IMG1.jpg';
import IMG2 from './IMG2.jpg';
import IMG3 from './IMG3.jpg';
import IMG4 from './IMG4.jpg';
import IMG5 from './IMG5.jpg';

class Links extends Component {
  constructor() {
    super();
    this.state = { 
      pCol: '', 
      dCol: '', 
      links: [],
      username: '', 
    };
    this.state.pCol = 12;
    this.state.dCol = 4;
    this.state.username = 'Team ShopYourLinks';
    this.state.links.push(<LinkCard 
      image={IMG0} 
      URL='https://shopyourlikes.com/'
      title='SYL'  />
    );
    this.state.links.push(<LinkCard 
      image={IMG1} 
      URL='https://www.facebook.com/carterwoohoo' 
      title='Carter Wu' />
    );
    this.state.links.push(<LinkCard 
      image={IMG2} 
      URL='https://www.facebook.com/jennifer.xu.5074'
      title='Jennifer Xu' />
    );
    this.state.links.push(<LinkCard 
      image={IMG3} 
      URL='https://www.facebook.com/katie.luangkote' 
      title='Katie LuangKote' />
    );
    this.state.links.push(<LinkCard 
      image={IMG4} 
      URL='https://www.facebook.com/TrinaKinz' 
      title='Katrina Wijaya' />
    );
    this.state.links.push(<LinkCard 
      image={IMG5} 
      URL='https://www.facebook.com/xonexuyun' 
      title='Yun Xu' />
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Typography variant="display3" component="h2" align="center">
          {this.state.username}
        </Typography>
        <div className={classes.list}>
          <Grid container spacing={16}>
            {this.state.links.map(linkCard =>
              <Grid item xs={this.state.pCol} md={this.state.dCol}>
                {linkCard}
              </Grid>
              )  
            }
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(ListStyles)(Links);