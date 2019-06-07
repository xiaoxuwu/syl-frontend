const EditStyles = theme => ({
  content: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  editList: {
    display: 'inline-flex',
    justifyContent: 'center',
    paddingTop: '30px',
  },
  list: {
    justifyContent: 'center',
    maxHeight: '100vh',
    height: '100vh',
    width: '100%',
    minHeight: 0,
  },
  preview: {
    display: 'inline-flex',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
    paddingTop: 200,
    padding: 'auto',
    backgroundColor: 'lightgray',
  },
  media: {
    height: 150,
    width: 150,
  },
  pref: {
    marginTop: 64
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
    marginLeft: '5%',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  overflowWrapper: {
    overflowY: 'auto',
    maxHeight: '100%',
  },
  error: {
    marginLeft: '25%',
    marginTop: '0.5%',
  },
  errorMsg: {
    color: 'red',
  }
});

export default EditStyles;
