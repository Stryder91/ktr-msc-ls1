import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './index.css';
import App from './App';
import store from './Store';

const Root = () => {
  return(
    <BrowserRouter>
      <Switch>
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