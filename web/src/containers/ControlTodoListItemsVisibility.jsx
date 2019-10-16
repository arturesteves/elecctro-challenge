import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTodosVisibility } from "../actions/visibility";
import Switch from '@material-ui/core/Switch';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	container: {
		marginRight: '10%',
		[theme.breakpoints.up('md')]: {
			marginRight: '25%',
		},
	}
}));

const ControlTodoListItemsVisibility = (props) => {
	const classes = useStyles();
	const [ visibility, setVisibility ] = useState(false);


	return (
		<div className={ classes.container }>
			<FormGroup>
				<FormControlLabel
					labelPlacement="start"
					control={
						<Switch checked={ visibility } onChange={ (e) => {
							setVisibility(e.target.checked);
							changeTodoListItemsVisibility(e.target.checked, props.dispatch)
						} } value="hideCompleted" color="primary"/>
					}
					label="Hide Completed"
				/>
			</FormGroup>
		</div>
	);
};

const changeTodoListItemsVisibility = (checked, dispatch) => {
	const visibility = checked ? 'INCOMPLETE' : 'ALL';
	dispatch(setTodosVisibility(visibility));
};

export default connect()(ControlTodoListItemsVisibility);
