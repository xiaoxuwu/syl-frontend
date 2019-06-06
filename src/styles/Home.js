import BackgroundImage from '../assets/images/background.jpg'

const HomeStyles = theme => ({
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover !important',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflowY: 'scroll',
    alignItems: 'center',
    display: 'flex',
    minWidth: '250px',
  },
  logo: {
    width: '40%',
    margin: '0 auto',
    minWidth: '250px',
  }
});

export default HomeStyles;
