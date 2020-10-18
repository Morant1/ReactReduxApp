import React from 'react';
import { Switch, Route } from 'react-router-dom';


import { Login } from './pages/Login'
import { ToyApp } from './pages/ToyApp'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { Dashboard } from './pages/Dashboard'
import { About } from './pages/About'
import {Navbar} from './cmps/Navbar';



export function App() {
  return (
    <div className="App main-container">
      <Navbar/>
      <Switch>
        <Route component={ToyEdit} path='/toy/edit/:_id?' />
        <Route component={ToyDetails} path='/toy/:_id' />
        <Route component={Dashboard} path='/dash' />
        <Route component={About} path='/about' />
        <Route component={ToyApp} path='/toy' />
        <Route component={Login} path='/' />
      </Switch>
    </div>
  );
}

export default App;
