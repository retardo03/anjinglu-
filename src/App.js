import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/header'
import Home from './component/home';
import {Switch,Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
