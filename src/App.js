import React, { Component } from 'react';
import './App.css';
import { SearchComponent } from './components/search/searchComponent.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchComponent/>
      </div>
    );
  }
}

export default App;
