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
    paddingTop: '10px',
    userSelect: 'none',
  },
  navlink: {
    marginRight: '10px',
  },
  drawerPaper: {
    zIndex: 1200,
    width: '285px'
  },
  menuButton: {
    marginLeft: '-4px'
  },
  topbarShift: {
    marginLeft: '285px',
  },
  hideImage: {
    display: 'none',
    pointerEvents: 'none',
  }
});

export default NavBarStyles;
