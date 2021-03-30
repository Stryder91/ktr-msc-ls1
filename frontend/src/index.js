import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import App from './App';
import store from './Store';

const Root = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={App}/>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);