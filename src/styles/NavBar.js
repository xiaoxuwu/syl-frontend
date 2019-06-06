const NavBarStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
  },
  toolbarTitle: {
    flex: 1,
  }, 
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: '175px',
    paddingTop: '10px'
  },
  navlink: {
    marginRight: '10px',
  },
  drawerPaper: {
    zIndex: 1200,
    width: '285px'
  },
  sidebar: {
    width: '270px'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: '270px'
  }
});

export default NavBarStyles;
