import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router, browserHistory, IndexRoute } from 'react-router'
import thunk from 'redux-thunk'
import {AUTH_USER} from './actions/types'

import App from './components/app';
import Feature from './components/feature';
import Welcome from './components/welcome';
import SignIn from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import requireAuth from './components/auth/require_auth';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('token')
if(token) {
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory }>
      <Route path='/' component={App}>
      <IndexRoute component={Welcome} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signout' component={Signout} />
      <Route path='/signup' component={Signup} />
      <Route path='/feature' component={requireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
