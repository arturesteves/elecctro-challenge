import { addTodoItemRequest, deleteTodoItemRequest, editTodoItemRequest, getTodoItemsRequest } from "../services/todos";


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
		if (result.error) {
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
		if (result.error) {
			console.log('Fetch Todos Request Failed');
			return;
		}
		dispatch(fetchTodosAction(result.data));
	}
};

export const EDIT_TODO = 'EDIT_TODO';
export const editTodoAction = (todo) => {
	return {
		type: EDIT_TODO,
		todo
	}
};
export const editTodo = (todo) => {
	return async (dispatch) => {
		const result = await editTodoItemRequest(todo);
		if (result.error) {
			console.log('Edit Todo Request Failed');
			return;
		}
		dispatch(editTodoAction(result.data));
	}
};

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodoAction = (id) => {
	return {
		type: DELETE_TODO,
		id
	}
};
export const deleteTodo = (id) => {
	return async (dispatch) => {
		const result = await deleteTodoItemRequest(id);
		if (result.error) {
			console.log('Delete Todo Request Failed');
			return;
		}
		dispatch(deleteTodoAction(result.data));
	}
};

