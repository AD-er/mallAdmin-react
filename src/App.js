import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './route/PrivateRoute';
import store from './store';
import Login from './views/Login';
import Main from './views/Main';

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
		    <Provider store={store}>
		      <Switch>
		        <Route path="/login" component={Login} />
		        <PrivateRoute path="/" component={Main} />
		      </Switch>
		    </Provider>
		  </BrowserRouter>
    );
  }
}

export default App;
