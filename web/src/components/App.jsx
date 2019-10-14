import React from 'react';
import '../App.css';
import AddTodoItem from "./AddTodoItem";
import ListTodoItemsContainer from "../containers/ListTodoItemsContainer";
import ControlTodoListItemsVisibility from "../containers/ControlTodoListItemsVisibility";
import AddTodoItemContainer from "../containers/AddTodoItemContainer";
import Header from "./Header";


const App = () => {
	return (
		<div className="App">
			<Header/>
			<AddTodoItemContainer/>
			<ListTodoItemsContainer/>
			<ControlTodoListItemsVisibility/>
		</div>
	);
};


export default App;
