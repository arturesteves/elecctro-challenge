import React from 'react';
import * as PropTypes from 'prop-types';
import ClickableHeader from "../containers/ClickableHeader";
import ViewTodoItemContainer from "../containers/ViewTodoItemContainer";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
	root: {
		width: "80%",
		margin: "0 auto",
	},
	container: {
		height: '500px'
	}
}));

const ListTodoItems = ({ todos }) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<ClickableHeader>
				<Typography component="div">
					<Box fontSize="h5.fontSize" letterSpacing={ 6 } m={ 1 }>
						Tasks
					</Box>
				</Typography>
			</ClickableHeader>
			{ todos.length === 0 ?
				<span>No Todos Found</span> :
				<List className={ classes.root } style={{padding: "15px", height: "100%", overflow: 'auto', scrollbarWidth: "none"}}>
					{ todos.map((todo, index) => {
						return <ViewTodoItemContainer key={ index } todo={ todo } index={ index }/>;
					}) }
				</List>
			}
		</div>
	);
};

ListTodoItems.propTypes = {
	todos: PropTypes.array.isRequired
};

export default ListTodoItems;
