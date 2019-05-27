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
  }
});

export default NavBarStyles;
