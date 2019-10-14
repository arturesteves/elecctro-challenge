import React from 'react';
import * as PropTypes from 'prop-types';
import ClickableHeader from "../containers/ClickableHeader";
import ViewTodoItemContainer from "../containers/ViewTodoItemContainer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import List from "@material-ui/core/List";


const ListTodoItems = ({ todos }) => {
	const [checked, setChecked] = React.useState([0]);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<div>
			<ClickableHeader>Tasks</ClickableHeader>
			<ul>
				{ todos.length === 0 ? <span>No Todos :(</span> : null }
				{ todos.map((todo, index) => {
					return <li key={ index }>
						<ViewTodoItemContainer todo={ todo } index={ index }/>
					</li>;
				}) }
			</ul>
			<List >
				{todos.map( (value, index) => {
					const labelId = `checkbox-list-label-${value.id}`;

					return (
						<ListItem key={index} role={undefined} dense button onClick={handleToggle(value.id)}>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={checked.indexOf(value.id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.description} />
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="edit" onClick={() => {
									alert('Clicked on Edit icon');
								}}>
									<EditIcon />
								</IconButton>
								<IconButton edge="end" aria-label="delete" onClick={() => {
									alert('Clicked on Delete icon');
								}}>
									<DeleteIcon color={"secondary"}/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};

ListTodoItems.propTypes = {
	todos: PropTypes.array.isRequired
};

export default ListTodoItems;
