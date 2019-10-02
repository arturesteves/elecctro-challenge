import { addTodoItemRequest, getTodoItemsRequest } from "../services/todos";


export const ADD_TODO = 'ADD_TODO';
const addTodoAction = (newTodo) => {
	return {
		type: ADD_TODO,
		newTodo
	};
};
export const addTodo = (todo) => {
	return async (dispatch) => {
		const result = await addTodoItemRequest(todo);
		if(result.error) {
			console.log('Add Todo Request Failed');
			return;
		}
		dispatch(addTodoAction(result.data));
	}
};


export const FETCH_TODOS = 'FETCH_TODOS';
export const fetchTodosAction = (todos) => {
	return {
		type: FETCH_TODOS,
		todos
	};
};
export const fetchTodos = () => {
	return async (dispatch) => {
		const result = await getTodoItemsRequest();
		console.log('Result', result);
		if(result.error) {
			console.log('Fetch Todos Request Failed');
			return;
		}
		dispatch(fetchTodosAction(result.data));
	}
};