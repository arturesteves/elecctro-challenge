import React from 'react';
import '../App.css';
import ListTodoItemsContainer from "../containers/ListTodoItemsContainer";
import ControlTodoListItemsVisibility from "../containers/ControlTodoListItemsVisibility";
import AddTodoItemContainer from "../containers/AddTodoItemContainer";
import Header from "./Header";


const style = {
	background: {
		height: "100vh",
		background: "linear-gradient(31deg, rgba(148,195,225,1) 0%, rgba(255,255,255,1) 100%)"
	}
};

const App = () => {
	return (
		<div className="App">
			<div style={ { ...style.background } }>
				<Header/>
				<AddTodoItemContainer/>
				<ListTodoItemsContainer/>
				<ControlTodoListItemsVisibility/>
			</div>
		</div>
	);
};


export default App;
