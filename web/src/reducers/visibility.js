import { SET_VISIBILITY } from "../actions/visibility";


const initialState = {
	visibilityFilter: 'ALL'
};

const todos = (state = initialState, action) => {
	switch (action.type) {
		case SET_VISIBILITY:
			return { visibilityFilter: action.visibility };
		default:
			return state;
	}
};

export const getVisibilityFilterFromStore = state => state.visibilityFilter;

export default todos;