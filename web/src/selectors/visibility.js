import { createSelector } from "reselect";


export const filteredTodoList = createSelector(
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