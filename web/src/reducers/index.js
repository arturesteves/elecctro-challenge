import { combineReducers } from 'redux';
import todos from './todos';
import visibility from './visibility';
import sorting from "./sorting";


export default combineReducers({
	todos,
	visibility,
	sorting
});
