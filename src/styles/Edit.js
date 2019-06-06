const EditStyles = theme => ({
  content: {
    textAlign: 'center',
  },
  editList: {
    display: 'inline-flex',
    padding: '25px 25px 25px 25px',
    justifyContent: 'center'
  },
  list: {
    display: 'inline-flex',
    padding: '25px 25px 25px 25px',
    justifyContent: 'center',
    maxHeight: '100vh',
    overflow: 'auto',
    width: '100%',
  },
  preview: {
    display: 'inline-flex',
    padding: '25px 25px 25px 25px',
    justifyContent: 'center',
    overflow: 'auto',
    width: '100%',
    backgroundColor: 'lightgray',
  },
  media: {
  	height: 150,
  	width: 150,
  },
  pref: {
  	width: '100%',
  	padding: '25px 25px 25px 25px',
  	display: 'inline-flex',
    marginTop: '7%',
    marginLeft: '11%',
    marginRight: '11%',
    backgroundColor: 'pink',
  },
  info: {
  	display: 'inline-grid',
  	textAlign: 'left',
  	padding: '0px 25px 0px 25px',
  },
  addLink: {
    width: '70%',
    height: '100%',
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
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

export default EditStyles;