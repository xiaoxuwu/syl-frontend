const HomeStyles = theme => ({
  content: {
    textAlign: 'center',
  },
  editList: {
    display: 'inline-flex',
    padding: '25px 25px 25px 25px',
    justifyContent: 'left'
  },
  list: {
    display: 'inline-flex',
    padding: '25px 25px 25px 25px',
    justifyContent: 'center'
  },
  media: {
  	height: 150,
  	width: 150,
  },
  pref: {
  	width: '100%',
  	padding: '25px 25px 25px 25px',
  	display: 'inline-flex',
  },
  info: {
  	display: 'inline-grid',
  	textAlign: 'left',
  	padding: '0px 25px 0px 25px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

export default HomeStyles;