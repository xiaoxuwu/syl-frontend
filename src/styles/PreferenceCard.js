const LinkCardStyles = theme => ({
	card: {
		width: '100%',
		display: 'inline-flex',
		color: 'white',
		backgroundColor: 'transparent',
		border: '2px solid white',
		boxShadow: 'none'
	},
	cardText: {
		color: 'white',
		fontFamily: "'Oxygen', sans-serif"
	},
	media: {
		height: 150,
		width: 150,
	},
	info: {
		display: 'inline-grid',
		textAlign: 'left',
		padding: '0px 25px 0px 25px',
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
