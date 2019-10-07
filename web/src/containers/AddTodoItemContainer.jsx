import { withToastManager } from 'react-toast-notifications';
import { addTodo } from "../actions/todos";
import AddTodoItem from "../components/AddTodoItem";


const { connect } = require("react-redux");

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onAdd: (todo) => {
			dispatch(addTodo(todo));
		},
		displayNotification: (message, options) => {
			ownProps.toastManager.add(message, options);
		}
	};
};

const connector = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withToastManager(connector(AddTodoItem));