import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import reducers from "./reducers";

const middlewares = [ thunk ];

if (process.env.NODE_ENV !== `production`) {
	const { logger } = require(`redux-logger`);
	middlewares.push(logger);
}

const engine = createEngine('elecctro-todo-storage-key');
const storageMiddleware = storage.createMiddleware(engine, [], []);
middlewares.push(storageMiddleware);

const rootReducer = combineReducers(reducers);

const store = createStore(
	rootReducer,
	Map({}),
	applyMiddleware(...middlewares)
);

const load = storage.createLoader(engine);

load(store)
	.then((newState) => console.log('Loaded state:', newState))
	.catch(() => console.log('Failed to load previous state'));

export default store;
