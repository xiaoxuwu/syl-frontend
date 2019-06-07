const PreferenceCardStyles = theme => ({
	action: {
		color: 'white'
	},
	content: {
		width: '100%',
		display: 'inline-flex',
		color: 'white',
		backgroundColor: '#ff6666',
		boxShadow: 'none',
		borderRadius: 6
	},
	cardText: {
		color: 'white',
		fontFamily: "'Oxygen', sans-serif"
	},
	media: {
		height: 'auto',
		width: '100%',
    	height: '100%'
	},
	info: {
		textAlign: 'left'
	},
	pref: {
		overflowWrap: 'break-word',
		wordWrap: 'break-word',
		wordBreak: 'break-word',
	},
	button: {
		margin: theme.spacing.unit,
		width: '120px',
		justify: 'center'
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
	prefButtons: {
		textAlign: 'right',
		marginTop: 20
	},
	username: {
		color: 'white'
	},
	fileUpload: {
		color: 'white'
	},
	noMargin: {
		marginBottom: 0,
	},
	uploadWrapper: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		// borderRadius: 10,
    	// border: 'white solid 2px'
	}
});

export default PreferenceCardStyles;
