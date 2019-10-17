import { withToastManager } from 'react-toast-notifications';
import { connect } from 'react-redux';
import ViewTodoItem from "../components/ViewTodoItem";
import { deleteTodo, editTodo } from "../actions/todos";


const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDelete: (onSuccess, onFailure) => {
			dispatch(deleteTodo(ownProps.todo.id, ownProps.index, onSuccess, onFailure));
		},
		onEdit: (todo, onSuccess, onFailure) => {
			dispatch(editTodo(todo, ownProps.index, onSuccess, onFailure));
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

export default withToastManager(connector(ViewTodoItem));