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
  }
});

export default NavBarStyles;
