import React from 'react';
import ListTodoItemsContainer from "../containers/ListTodoItemsContainer";
import ControlTodoListItemsVisibility from "../containers/ControlTodoListItemsVisibility";
import AddTodoItemContainer from "../containers/AddTodoItemContainer";
import Header from "./Header";


const style = {
	background: {
		height: "100vh",
		background: "linear-gradient(31deg, rgba(148,195,225,1) 0%, rgba(255,255,255,1) 100%)"
	},
	container: {
		textAlign: "center"
	}
};

const App = () => {
	return (
		<div style={ { ...style.background, ...style.container } }>
			<Header/>
			<AddTodoItemContainer/>
			<ControlTodoListItemsVisibility/>
			<ListTodoItemsContainer/>
		</div>
	);
};


export default App;
