const EditStyles = theme => ({
  content: {
    // textAlign: 'center',
    height: '100%',
  },
  editList: {
    display: 'inline-flex',
    // padding: '25px 25px 25px 25px',
    justifyContent: 'center',
    paddingTop: '30px',
  },
  list: {
    display: 'inline-flex',
    // padding: '25px 25px 25px 25px',
    justifyContent: 'center',
    maxHeight: '100vh',
    overflow: 'auto',
    width: '100%',
  },
  preview: {
    display: 'inline-flex',
    // padding: '25px 25px 25px 25px',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
    paddingTop: '10%',
    padding: 'auto',
    backgroundColor: 'lightgray',
  },
  media: {
  	height: 150,
  	width: 150,
  },
  pref: {
  	// width: '100%',
  	// padding: '25px 25px 25px 25px',
    margin: '10%',
  	// display: 'inline-flex',
    // marginTop: '7%',
    // marginLeft: '11%',
    // marginRight: '11%',
    backgroundColor: 'pink',
  },
  info: {
  	display: 'inline-grid',
  	textAlign: 'left',
  	padding: '0px 25px 0px 25px',
  },
  linkWrapper: {
    margin: '0 auto',
  },
  addLink: {
    width: '50%',
    // height: '100%',
    marginLeft: '25%',
    display: 'inline-block',
  },
  addLinkButton: {
    color: 'white',
    backgroundColor: '#ff6666',
    '&:hover': {
      backgroundColor: '#e65c5c',
    },
    float: 'right',
  },
  addLinkInput: {
    width: '60%',
    height: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

export default EditStyles;