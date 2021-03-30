
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

import './App.css';
import MyCard from './components/BusinessCard';

const App = ({token}) => {

  const [allCards, setCards] = useState([]);
	useEffect(()=> {
		axios.post('http://localhost:5000/getAllCards', {'username': token.access_token.user.name})
        .then(res => {
        setCards(res.data);
        })
        .catch(err => {
			console.log("Error getting all cards", err)
        });
	}, [])

  if (!token) {
		return <Redirect push to ="login" />
	}


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
