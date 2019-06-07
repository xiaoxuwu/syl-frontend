const PreferenceCardStyles = theme => ({
	content: {
		width: '100%',
		display: 'inline-flex',
		color: 'white',
		backgroundColor: 'pink',
		border: '2px solid white',
		boxShadow: 'none',
		borderRadius: 6
	},
	cardText: {
		color: 'white',
		fontFamily: "'Oxygen', sans-serif"
	},
	media: {
		height: 'auto',
		width: '30%',
		paddingLeft: '10%', 
		paddingRight: '5%', 
	},
	info: {
		display: 'inline-grid',
		textAlign: 'left',
		padding: '3% 5% 3% 5%',
		width: '100%',
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
	}
});

export default PreferenceCardStyles;
