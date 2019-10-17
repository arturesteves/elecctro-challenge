export const SORT_ALPHABETICALLY_ASCENDING = 'ALPHABETICALLY_ASCENDING';
export const SORT_ALPHABETICALLY_DESCENDING = 'ALPHABETICALLY_DESCENDING';
export const SORT_CREATION_DATE_ASCENDING = 'CREATION_DATE_ASCENDING';

export const SORT_TODOS_ACTION = 'SORT_TODOS';
export const sortTodos = (order) => {
	return {
		type: SORT_TODOS_ACTION,
		order,
	};
};
