import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import ListTodoItems from "../components/ListTodoItems";
import { fetchTodos } from "../actions/todos";
import { selectVisibleAndSortedTodoItems } from "../reducers/sorting";


const ListTodoItemsContainer = (props) => {

	useEffect(() => {
		props.dispatch(fetchTodos());
	}, []);

	return (
		<Fragment>
			<ListTodoItems todos={ props.todos }/>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		todos: selectVisibleAndSortedTodoItems(state).toJS()
	};
};

const connector = connect(
	mapStateToProps,
);

export default connector(ListTodoItemsContainer);
