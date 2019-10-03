import {
	SORT_ALPHABETICALLY_ASCENDING,
	SORT_ALPHABETICALLY_DESCENDING,
	SORT_CREATION_DATE_ASCENDING,
	SORT_TODOS_ACTION
} from "../actions/sorting";
import { createSelector } from "reselect";
import { selectFilteredTodoList } from "./visibility";


const initialState = {
	order: SORT_CREATION_DATE_ASCENDING
};

const sorting = (state = initialState, action) => {
	switch (action.type) {
		case SORT_TODOS_ACTION:
			return action.order;
		default:
			return state;
	}
};

const selectSortFilter = (state) => state.sorting;

export const selectVisibleAndSortedTodoItems = createSelector(
	selectFilteredTodoList,
	selectSortFilter,
	(todos, order) => {
		switch (order) {
			case SORT_ALPHABETICALLY_ASCENDING:
				return sort(todos, "description", "ascending");
			case SORT_ALPHABETICALLY_DESCENDING:
				return sort(todos, "description", "descending");
			case SORT_CREATION_DATE_ASCENDING:
			default:
				return sort(todos, "dateAdded", "ascending");
		}
	}
);

const sort = (list, property, order) => {
	const newList = [ ...list ];
	newList.sort((a, b) => {
		if (a[property] < b[property]) {
			return order === 'ascending' ? -1 : 1;
		}
		if (a[property] > b[property]) {
			return order === 'ascending' ? 1 : -1;
		}
		return 0;
	});
	return newList;
};

export default sorting;