import ViewTodoItem from "../components/ViewTodoItem";
import { deleteTodo, editTodo } from "../actions/todos";
const { connect } = require("react-redux");

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDelete: () => {
			dispatch(deleteTodo(ownProps.todo.id, ownProps.index));
		},
		onEdit: (todo) => {
			dispatch(editTodo(todo, ownProps.index));
		}
	};
};

const connector = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default connector(ViewTodoItem);