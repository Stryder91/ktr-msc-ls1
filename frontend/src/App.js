
import React from 'react';
import './App.css';
import MyCard from './components/BusinessCard';
import {connect} from 'react-redux';

const App = ({token}) => {
  return (
    <div className="App">
      <MyCard user={token.user}/>
    </div>
  );
}

// to GET from the store
const getProps = state => {
  return {
    token  : state.access_token
  }
}
export default connect(getProps, null)(App);
