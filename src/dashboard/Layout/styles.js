export default theme => ({
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
    }),
    height: '100%',
  },
  contentShift: {
    marginLeft: '270px'
  },
  menuButton: {
    marginLeft: '-4px'
  },
  topbarShift: {
    marginLeft: '285px',
    // width: 'calc(-271px + 100vw)'
  },
});
