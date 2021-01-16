import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Celeb from './Component/Celeb';
import Home from './Component/Home';
import Predict from './Component/Predict';
import Search from './Component/Search'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCeleb } from './redux/actions'
import New from './Component/New'


const App = (props) => {
  let dispatch = useDispatch();
  let todos = useSelector(state => state)
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://0.0.0.0:5000/')
      .then(response => response.json())
      .then(results => dispatch(loadCeleb(results)));
  }, []);

  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/celeb' component={Celeb} />
      <Route exact path='/predict' component={Predict} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/new' component={New} />
    </Router >
  );
}

export default App;
