import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodosFromStore } from "../reducers/todos";
import ListTodoItems from "../components/ListTodoItems";
import { fetchTodos } from "../actions/todos";


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
		todos: getTodosFromStore(state)
	};
};

const connector = connect(
	mapStateToProps,
);

export default connector(ListTodoItemsContainer);
