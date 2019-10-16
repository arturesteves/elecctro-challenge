import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '50%',
		margin: '0 auto',
		marginTop: '10px',
		[theme.breakpoints.down('sm')]: {
			width: '80%',
		},
	},
	input: {
		marginLeft: theme.spacing(1),
	},
	divider: {
		height: 28,
		margin: 4,
	},
}));


const AddTodoItem = (props) => {
	const classes = useStyles();
	return (
		<div>
			<form name="newTodoForm" onSubmit={ (e) => {
				e.preventDefault();
				onSubmit(e.target.todoDescription.value, props.onAdd, props.displayNotification)
			} }>
				<Paper className={ classes.root }>
					<InputBase
						className={ classes.input }
						inputProps={ { maxLength: 70 } }
						type="text"
						name="todoDescription"
						required={ true }
						placeholder="Todo - Save the World"
						autoComplete={ "off" }
						fullWidth
						margin="normal"
						InputLabelProps={ {
							shrink: true,
						} }
					/>
					<Divider className={ classes.divider } orientation="vertical"/>
					<IconButton type={ "submit" } color="primary" className={ classes.iconButton } aria-label="directions">
						<AddIcon/>
					</IconButton>
				</Paper>
			</form>
		</div>
	);
};

const onSubmit = (description, onAdd, displayNotification) => {
	console.log('Todo Description:', description);
	const todo = {
		description
	};
	onAdd(todo, () => {
		displayNotification(successNotification());
	}, () => {
		displayNotification(failureNotification());
	});

	resetForm();
};

const successNotification = () => {
	return {
		message: <p>Your todo was created and saved &#128522;</p>,
		options: {
			appearance: 'success',
			autoDismissTimeout: 7000,
			autoDismiss: true,
		}
	};
};

const failureNotification = () => {
	return {
		message: <p>You could not create you todo &#128522;</p>,
		options: {
			appearance: 'error',
			autoDismissTimeout: 7000,
			autoDismiss: true,
		}
	};
};

const resetForm = () => {
	const form = document.getElementsByName("newTodoForm")[0];
	form.reset();
};

export default AddTodoItem;
