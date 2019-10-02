import React, { useEffect, useState, useReducer } from 'react';
import '../App.css';
import AddTodoItem from "./AddTodoItem";
import ListTodoItems from "./ListTodoItems";
import { createSelector } from 'reselect'
import ListTodoItemsContainer from "../containers/ListTodoItemsContainer";


const todoList = [
	{ id: 'A', description: 'A', state: 'INCOMPLETE' },
	{ id: 'B', description: 'B', state: 'COMPLETE' },
	{ id: 'C', description: 'C', state: 'INCOMPLETE' },
	{ id: 'D', description: 'D', state: 'INCOMPLETE' },
	{ id: 'E', description: 'E', state: 'COMPLETE' },
];


const hideCompleted = (list, checked, setTodos) => {
	const result = filteredTodoList({ list, checked });
	console.log('result:', result);
	setTodos(result);
};

const App = () => {
	//const [ todos, setTodos ] = useState([]);
	const [ count, setCount ] = useState(0);

	const [ myArray, dispatch ] = useReducer((myArray, { type, value }) => {
		console.log('hjere', myArray);
		switch (type) {
			case "add":
				return [ ...myArray, value ];
			case "remove":
				return myArray.filter((_, index) => index !== value);
			default:
				return myArray;
		}
	}, todoList);

	return (
		<div className="App">
			<AddTodoItem/>
			{/*<ListTodoItems todos={ myArray }/>*/}
			<ListTodoItemsContainer />
			<div>
				<button onClick={ (e) => {
					console.log('asd');
					//setTodos([]);
				} }>asd
				</button>
				<span>Hide Completed</span>
				<input type="checkbox" name="hideCompleted"
							 onChange={ (e) => hideCompleted(myArray, e.target.checked, dispatch) }/>
			</div>
			<div>
				<p>You clicked { count } times</p>
				<button onClick={ () => {
					setCount(count + 1);
					dispatch({ type: "remove", value: 1 })
				} }>
					Click me
				</button>
				<button onClick={ () => {
					dispatch({ type: "add", value: 2 })
				} }>
					Click me
				</button>
			</div>
		</div>
	);
};

const filteredTodoList = createSelector(
	(state) => state.list.filter((item) => {
		if (state.checked && item.state === 'INCOMPLETE') {
			return item;
		}
		if (!state.checked) {
			return item;
		}
	}),
	(items) => items.map((item) => item)
);

export default App;
