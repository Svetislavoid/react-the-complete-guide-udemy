import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium'
import Person from './Person/Person'

class App extends Component {

// promena state property dovodi do re-renderovanja
  state = {
    persons: [
      {id: 'sljkdf', name: 'Đoka', age: '123'},
      {id: 'xcvihi', name: 'Stoka', age: '541'},
      {id: 'ygnxvb', name: 'Milojko', age: '159'}
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} )
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons;
    const persons = [...this.state.persons]; // bolje je raditi ovako, pravimo kopiju niza iz state-a kojom nadalje manipulišemo
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click = {() => this.deletePersonHandler(index)}
              name = {person.name}
              age = {person.age}
              key = {person.id} // key property je bitan da bi React efikasnije radio re-renderovanje
              changed = {(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi!</h1>
          <h3 className={classes.join(' ')}>Ho</h3>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
    // Ovo ispod je ustvari ono u šta se renderuje JSX kod
    // return React.createElement('div', {className: 'App'}, React.createElement('h3', null, 'Howdy hoo!'));
  }
}

export default Radium(App);
