const LinkCardStyles = theme => ({
	card: {
		width: '100%',
		display: 'inline-flex',
		color: 'white',
		backgroundColor: 'transparent',
		border: '2px solid white',
		boxShadow: 'none',
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
		// textAlign: 'left',
		padding: '3% 0 3% 5%',
	},
	button: {
		margin: theme.spacing.unit,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
});

export default LinkCardStyles;
