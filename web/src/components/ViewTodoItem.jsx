import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';


const ViewTodoItem = ({ todo }) => {
	return (
		<Fragment>
			{ isTodoCompleted(todo) ? <ViewCompleteTodoItem todo={ todo }/> : <ViewIncompleteTodoItem todo={ todo }/> }
		</Fragment>
	);
};

const isTodoCompleted = (todo) => {
	return todo.state === 'COMPLETE';
};

const ViewCompleteTodoItem = ({ todo }) => {

	return (
		<Fragment>
			<input type="checkbox" name="todoCompleted" onChange={ markTodo } checked={true} disabled={true}/>
			<span>{todo.description}</span>
		</Fragment>
	)
};

const ViewIncompleteTodoItem = ({ todo }) => {

	return (
		<Fragment>
			<input type="checkbox" name="todoCompleted" onChange={ markTodo }/>
			<span>{ todo.description }{ ' ' }</span>
			<button onClick={ () => {
				alert('Edit');
			} }>Edit
			</button>
			<button onClick={ () => {
				alert('Delete');
			} }>Delete
			</button>
		</Fragment>
	)
};

const markTodo = (e) => {
	console.log(e.target.checked);

};

ViewTodoItem.propTypes = {
	todo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		dateAdded: PropTypes.string
	}).isRequired
};

export default ViewTodoItem;
