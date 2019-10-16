import { applyMiddleware, compose, createStore } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';


const middlewares = [ thunk ];

if (process.env.NODE_ENV !== `production`) {
	const { logger } = require(`redux-logger`);
	middlewares.push(logger);
}

const rootReducer = combineReducers(reducers);

const store = createStore(
	rootReducer,
	Map({}),
	applyMiddleware(...middlewares)
);

export default store;
