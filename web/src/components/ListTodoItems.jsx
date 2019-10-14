import React from 'react';
import * as PropTypes from 'prop-types';
import ClickableHeader from "../containers/ClickableHeader";
import ViewTodoItemContainer from "../containers/ViewTodoItemContainer";
import List from "@material-ui/core/List";


const ListTodoItems = ({ todos }) => {

	return (
		<div>
			<ClickableHeader>Tasks</ClickableHeader>
			{ todos.length === 0 ?
				<span>No Todos Found</span> :
				<List>
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
