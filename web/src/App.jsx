import React from 'react';
import './App.css';
import AddTodoItem from "./AddTodoItem";
import ListTodoItems from "./ListTodoItems";
import { createSelector } from 'reselect'


const todoList= [
  {id: 'A', description: 'A', state: 'INCOMPLETE'},
  {id: 'B', description: 'B', state: 'COMPLETE'},
  {id: 'C', description: 'C', state: 'INCOMPLETE'},
  {id: 'D', description: 'D', state: 'INCOMPLETE'},
  {id: 'E', description: 'E', state: 'COMPLETE'},
];


const hideCompleted = (list, checked, setTodos) => {
	const result = filteredTodoList({ list, checked });
	console.log('result:', result);
	setTodos(result);
};

const App = () => {
  return (
    <div className="App">
      <AddTodoItem/>
      <ListTodoItems todos={todoList}/>
      <div>
        <span>Hide Completed</span>
        <input type="checkbox" name="hideCompleted" onChange={hideCompleted}/>
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
