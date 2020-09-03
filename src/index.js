import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reducer from './store/reducers/dishInformation';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer, applyMiddleware(thunk));

const app = <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>;

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
