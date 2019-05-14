import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ListStyles from '../styles/Lists.js';

import LinkCard from '../components/LinkCard.js';

import IMG0 from './IMG0.png';
import IMG1 from './IMG1.jpg';
import IMG2 from './IMG2.jpg';
import IMG3 from './IMG3.jpg';
import IMG4 from './IMG4.jpg';
import IMG5 from './IMG5.jpg';

const Links = (props) => {
  const { classes } = props;
  var pCol = 12;
  var dCol = 4;
  var links = [];
  links.push(<LinkCard 
    image={IMG0} 
    URL='https://shopyourlikes.com/'
    title='SYL'
    desc="ShopYourLike website"  />
  );
  links.push(<LinkCard 
    image={IMG1} 
    URL='https://www.facebook.com/carterwoohoo' 
    title='Carter Wu'
    desc="link to Cater's facebook page"/>
  );
  links.push(<LinkCard 
    image={IMG2} 
    URL='https://www.facebook.com/jennifer.xu.5074'
    title='Jennifer Xu'
    desc="link to Jennifer's facebook page" />
  );
  links.push(<LinkCard 
    image={IMG3} 
    URL='https://www.facebook.com/katie.luangkote' 
    title='Katie LuangKote'
    desc="link to Katie's facebook page" />
  );
  links.push(<LinkCard 
    image={IMG4} 
    URL='https://www.facebook.com/TrinaKinz' 
    title='Katrina Wijaya'
    desc="link to Katrina's facebook page" />
  );
  links.push(<LinkCard 
    image={IMG5} 
    URL='https://www.facebook.com/xonexuyun' 
    title='Yun Xu'
    desc="link to Yun's facebook page" />
  );

  return (
    <div className={classes.list}>
      <Grid container spacing={16}>
      	{links.map(linkCard =>
          <Grid item xs={pCol} md={dCol}>
            {linkCard}
          </Grid>
          )  
        }
      </Grid>
    </div>
  );
}

export default withStyles(ListStyles)(Links);