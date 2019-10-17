import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ElecctroLogo from '../resources/logo-original-red.png';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
}));


const Header = () => {
	const classes = useStyles();

	return (
		<div className={ classes.grow }>
			<AppBar position="static">
				<Toolbar>
					<img src={ ElecctroLogo }
							 alt={ "Elecctro Logo" }
							 className={ classes.menuButton }
							 color="inherit"
							 aria-label="open drawer"
							 height="80" width="130	"/>
					<Typography className={ classes.title } variant="h6" noWrap>
						<Box fontFamily="Monospace">
							Todo Web App - Elecctro React Challenge
						</Box>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;