export const SET_VISIBILITY = 'SET_VISIBILITY';
const setTodosVisibilityAction = (visibility) => {
	return {
		type: SET_VISIBILITY,
		visibility
	};
};
export const setTodosVisibility = (visibility) => {
	return async (dispatch) => {
		dispatch(setTodosVisibilityAction(visibility));
	}
};
