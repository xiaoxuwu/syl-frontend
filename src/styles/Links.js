const ListStyles = theme => ({
  content: {
  	margin: '25px 25px 80px 25px',
  },
  list: {
    display: 'inline-flex',
    padding: '25px 25px 25px 25px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbarTitle: {
    flex: 1,
  }
});

export default ListStyles;