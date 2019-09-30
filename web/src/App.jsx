import React from 'react';
import './App.css';
import NewTodoItem from "./NewTodoItem";
import ListTodoItems from "./ListTodoItems";

const todoList= [
  {id: 'A', description: 'A', state: 'INCOMPLETE'},
  {id: 'B', description: 'B', state: 'COMPLETE'},
  {id: 'C', description: 'C', state: 'INCOMPLETE'},
  {id: 'D', description: 'D', state: 'INCOMPLETE'},
  {id: 'E', description: 'E', state: 'COMPLETE'},
];

const hideCompleted = (e) => {
  console.log(e.target.checked);
};

const App = () => {
  return (
    <div className="App">
      <NewTodoItem/>
      <ListTodoItems todos={todoList}/>
      <div>
        <span>Hide Completed</span>
        <input type="checkbox" name="hideCompleted" onChange={hideCompleted}/>
      </div>
    </div>
  );
};

export default App;
