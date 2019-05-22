import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const SnackBarStyles = theme => ({
    success: {
        marginTop: 20,
        backgroundColor: green[600],
    },
    error: {
        marginTop: 20,
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        marginTop: 20,
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        marginTop: 20,
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

export default SnackBarStyles;