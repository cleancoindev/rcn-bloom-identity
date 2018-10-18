import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bloom from './pages/Bloom';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/bloom" component={Bloom} />
      </div>
    </Router>
  );
};

export default App;
