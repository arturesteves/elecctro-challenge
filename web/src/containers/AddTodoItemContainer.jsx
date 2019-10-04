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
		}
	};
};

const connector = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default connector(AddTodoItem);