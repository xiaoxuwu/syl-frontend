const PreferenceCardStyles = theme => ({
	action: {
		color: 'white'
	},
	content: {
		width: '100%',
		display: 'inline-flex',
		color: 'white',
		backgroundColor: 'pink',
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
		textAlign: 'right'
	},
	username: {
		color: 'white'
	}
});

export default PreferenceCardStyles;
