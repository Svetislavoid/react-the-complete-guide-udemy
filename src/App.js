import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {

// promena state property dovodi do re-renderovanja
  state = {
    persons: [
      {name: 'Đoka', age: '123'},
      {name: 'Stoka', age: '541'}
    ]
  }

  switchNameHandler = (newName) => {
    // ovako menjamo state property
    this.setState( {
      persons: [
        {name: newName, age: '123'},
        {name: 'Stokson', age: '541'}
      ]
    } )
  }

  nameChangedHandler = (event) => {
    // ovako menjamo state property
    this.setState( {
      persons: [
        {name: 'Đoka', age: '123'},
        {name: event.target.value, age: '541'}
      ]
    } )
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi!</h1>
        <h3>Ho</h3>
        <button
          style={style}
          onClick={() => this.switchNameHandler('Đokivojča')}>Switch name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Đokivoje')}
          changed={this.nameChangedHandler}>Baš je stoka ovaj Đoka!</Person>
      </div>
    );
    // Ovo ispod je ustvari ono u šta se renderuje JSX kod
    // return React.createElement('div', {className: 'App'}, React.createElement('h3', null, 'Howdy hoo!'));
  }
}

export default App;
