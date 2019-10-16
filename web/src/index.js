import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import App from './components/App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


const store = createStore(
	reducers,
	applyMiddleware(ReduxThunk)
);


ReactDOM.render(
	<MuiThemeProvider theme={ theme }>
		<ToastProvider>
			<Provider store={ store }>
				<App/>
			</Provider>
		</ToastProvider>
	</MuiThemeProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
