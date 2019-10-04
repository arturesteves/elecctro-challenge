import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';


const ViewTodoItem = ({ todo, onDelete }) => {
		return (
		<Fragment>
			{ isTodoCompleted(todo) ? <ViewCompleteTodoItem todo={ todo } onDelete={onDelete}/> : <ViewIncompleteTodoItem todo={ todo } onDelete={onDelete}/> }
		</Fragment>
	);
};

const isTodoCompleted = (todo) => {
	return todo.state === 'COMPLETE';
};

const ViewCompleteTodoItem = ({ todo, onDelete }) => {

	return (
		<Fragment>
			<input type="checkbox" name="todoCompleted" onChange={ markTodo } checked={true} disabled={true}/>
			<Strike>{todo.description}</Strike>
		</Fragment>
	)
};

const ViewIncompleteTodoItem = ({ todo, onDelete }) => {

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
				onDelete();
			} }>Delete
			</button>
		</Fragment>
	)
};

const markTodo = (e) => {
	console.log(e.target.checked);

};

const Strike = (props) => {
	return (
		<Fragment>
			<span style={{color: 'red', textDecoration: 'line-through'}}>
  			<span style={{color: 'black'}}>{ props.children }</span>
			</span>
		</Fragment>
	);
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
