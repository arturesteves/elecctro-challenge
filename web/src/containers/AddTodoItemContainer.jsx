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
		onAdd: (todo, onSuccess, onFailure) => {
			dispatch(addTodo(todo, onSuccess, onFailure));
		},
		displayNotification: (notification) => {
			ownProps.toastManager.add(notification.message, notification.options);
		}
	};
};

const connector = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withToastManager(connector(AddTodoItem));