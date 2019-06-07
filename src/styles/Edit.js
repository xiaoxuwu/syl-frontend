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
    width: '100%',
    padding: 20
  },
  fullWidth: {
    width: '100%'
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
    paddingTop: 100,
    padding: 'auto'
  },
  media: {
    height: 150,
    width: 150,
  },
  pref: {
    marginTop: 64,
    padding: 20
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
    margin: 10
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
    marginTop: 20,
    marginLeft: 20
  },
  errorMsg: {
    color: 'red',
  },
  addLink: {
    padding: 20
  },
  addLinkInner: {
    padding: 25,
    border: '2px solid grey',
    borderRadius: 6
  },
  editCardWrapper: {
    borderRadius: 6,
    padding: 20,
  },
  leftLine: {
    borderLeft: '20px solid gray !important',
    marginBottom: '1.5em !important'
  },
  card: {
    border: '5px solid #ff6666'
  },
  inputs: {
    margin: 10
  }
});

export default EditStyles;
