import React, { Component } from 'react';
import classes from './App.module.css';
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

    let persons = null;
    let btnClass = '';

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
      btnClass = classes.Red;
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi!</h1>
        <h3 className={assignedClasses.join(' ')}>Ho</h3>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // Ovo ispod je ustvari ono u šta se renderuje JSX kod
    // return React.createElement('div', {className: 'App'}, React.createElement('h3', null, 'Howdy hoo!'));
  }
}

export default App;
