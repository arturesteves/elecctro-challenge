import React from 'react';
import '../App.css';
import AddTodoItem from "./AddTodoItem";
import ListTodoItemsContainer from "../containers/ListTodoItemsContainer";
import ControlTodoListItemsVisibility from "../containers/ControlTodoListItemsVisibility";


const App = () => {
	return (
		<div className="App">
			<AddTodoItem/>
			<ListTodoItemsContainer/>
			<ControlTodoListItemsVisibility/>
		</div>
	);
};


export default App;
