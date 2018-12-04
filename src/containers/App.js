import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

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
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons = {this.state.persons}
        clicked = {this.deletePersonHandler}
        changed = {this.nameChangedHandler} />;
    }

    return (
      <div className = {classes.App}>
        <Cockpit
          appTitle = {this.props.title}
          showPersons = {this.state.showPersons}
          persons = {this.state.persons}
          clicked = {this.togglePersonsHandler} />
        {persons}
      </div>
    );
    // Ovo ispod je ustvari ono u šta se renderuje JSX kod
    // return React.createElement('div', {className: 'App'}, React.createElement('h3', null, 'Howdy hoo!'));
  }
}

export default App;
