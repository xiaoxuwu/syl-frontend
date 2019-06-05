import BackgroundImage from '../assets/images/login-bg.jpg'

const LoginStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    }
  },
  mr: {
    marginRight: 5
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover !important',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflowY: 'scroll',
  },
  paper: {
    marginTop: theme.spacing.unit * 18,
    marginBottom: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  signIn: {
    marginTop: theme.spacing.unit * 3,
    padding: "20px 20px",
    width: "90%",
    fontSize: "16px",
    display: "block",
    margin: "0 auto",
    backgroundColor: "#ff6666",
    '&:hover': {
       backgroundColor: "#e65c5c",
    },
  },
  instagram: {
    marginTop: theme.spacing.unit * 3,
    width: "90%",
    margin: "0 auto",
  },
  register: {
    fontSize: "12px",
    paddingTop: theme.spacing.unit,
  },
  registerLink: {
    fontWeight: 600,
    color: "#ff6666",
    textDecoration: "none",
    cursor: "pointer",
  },
});

export default LoginStyles;
