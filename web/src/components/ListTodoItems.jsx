import React from 'react';
import * as PropTypes from 'prop-types';
import ClickableHeaderContainer from "../containers/ClickableHeaderContainer";
import ViewTodoItemContainer from "../containers/ViewTodoItemContainer";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import IconButton from "@material-ui/core/IconButton";


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
		<div className={ classes.container }>
			<div style={ { display: "inline-block" } }>
				<ClickableHeaderContainer>
					<IconButton color="primary">
						<FilterListIcon/>
					</IconButton>
					<Typography component="div" style={ { display: 'inline-block' } }>
						<Box fontSize="h5.fontSize" letterSpacing={ 6 } m={ 1 }>
							Tasks
						</Box>
					</Typography>
				</ClickableHeaderContainer>
			</div>
			<div>
				{ todos.length === 0 ?
					<span>No Todos Found</span> :
					<List className={ classes.root }
								style={ { padding: "15px", height: "100%", overflow: 'auto', scrollbarWidth: "none" } }>
						{ todos.map((todo, index) => {
							return <ViewTodoItemContainer key={ index } todo={ todo } index={ index }/>;
						}) }
					</List>
				}
			</div>
		</div>
	);
};

ListTodoItems.propTypes = {
	todos: PropTypes.array.isRequired
};

export default ListTodoItems;
