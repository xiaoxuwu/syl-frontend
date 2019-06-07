const ListStyles = theme => ({
  content: {
    flexGrow: 1,
    overflow: 'hidden',
    textAlign: 'center',
    padding: '25px 25px 25px 25px',
    minHeight: '100vh',
    minWidth: '300px',
  },
  paper: {
    maxWidth: 500,
    margin: 'auto',
    padding: theme.spacing.unit*2,
    backgroundColor: 'transparent',
  },
  handleText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: "'Oxygen', sans-serif",
    fontSize: 32,
    paddingTop: 10
  },
  list: {
    display: 'inline',
    padding: '25px 25px 25px 25px',
    minWidth: '300px',
  },
  gridItem: {
    paddingTop: 20,
  },
  imgWrapper: {
    width: '150px',
    height: '150px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '0 auto',
  },
  media: {
    display: 'inline',
    margin: '0 auto',
    height: 'auto',
    width: '100%',
  },
});

export default ListStyles;
