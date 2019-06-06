const drawerWidth = 260;

const DashboardStyles = theme => ({
    root: {
      display: 'flex',
      marginBottom: 20,
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },  
    profilePic: {
      marginTop: '25px',
      height: 150,
      width: 150,
      borderRadius: '50%',
      margin: '0 auto'
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    contentCard: {
      border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    fullHeight: {
      height: "100%"
    },
    contentHeader: {
      paddingTop: 15,
      paddingLeft: 45
    },
    contentHeaderText: {
      fontWeight: 400,
      paddingTop: 10,
      color: 'rgba(0, 0, 0, 0.75)'
    },
    usernameText: {
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 15
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 5,
      height: '100vh',
      overflow: 'auto',
    },
    chartContainer: {
      marginLeft: -22,
    },
    tableContainer: {
      height: '100%',
      paddingLeft: 5
    },
    h5: {
      marginBottom: theme.spacing.unit * 2,
    },
    'recharts-surface': {
      height: 500
    },
    select: {
      marginRight: 40,
      marginBottom: 20
    },
    topFilterWrapper: {
      textAlign: 'center'
    },
    topContentWrapper: {
      padding: 20
    },
    noLeftPadding: {
      paddingLeft: 0
    },
    noRightPadding: {
      paddingRight: 0
    },
    highlightText: {
      textAlign: 'center',
      color: 'dodgerblue'
    },
    rawWrapper: {
      marginTop: 40,
      border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    centerTitle: {
      paddingTop: 25,
      margin: '0 auto'
    }
});

export default DashboardStyles