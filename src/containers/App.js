import React, { PureComponent } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
// import WithClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

    constructor(props) {
        super(props); // ako koristimo construktor metod moramo odmah da pozovemo super
        console.log('[App.js] Inside Constructor', props);
      // ovde možemo i da stavimo state sa: this.state = ...
    }

    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

  // da ne bi radili ovolike provere u shouldComponentUpdate() možemo da koristimo PureComponent (u tom slučaju React sam ispituje sve pa se ne koristi shouldComponentUpdate())

    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('[UPDATE App.js] Inside shouldComponentUpdate()');
    //   return nextState.persons !== this.state.persons ||
    //     nextState.showPersons !== this.state.showPersons; // proveravamo da li ima promena tj. da li ima potrebe da se re-renderuje
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    // novi lifecycle hook u React 16.3
    getSnapshotBeforeUpdate() {
        console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate()');
    }

    // novi lifecycle hook u React 16.3
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[UPDATE App.js] Inside getDerivedStateFromProps()', nextProps, prevState);

        return prevState;
    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] Inside componentDidUpdate()');
    }

  // promena state property dovodi do re-renderovanja
    state = {
        persons: [
            {id: 'sljkdf', name: 'Đoka', age: 123},
            {id: 'xcvihi', name: 'Stoka', age: 541},
            {id: 'ygnxvb', name: 'Milojko', age: 159}
        ],
        showPersons: false,
        toggleClicked: 0,
        authenticated: false
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
        // ako menjamo state tako da nam promena zavisi od prethodne verzije state-a (prevState) onda je najbolje raditi ovako preko funkcije
        this.setState( (prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
    }

    lognHandler = () => {
        this.setState({authenticated: true});
    }

    render() {
        console.log('[App.js] Inside render()');

        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons = {this.state.persons}
                clicked = {this.deletePersonHandler}
                changed = {this.nameChangedHandler} />;
        }

      return (
          // jedan način je da radimo sa WithClass komponentom, drugi sa Aux i withClass
          // <WithClass classes={classes.App}>
          <Aux>
            <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
            <Cockpit
                appTitle = {this.props.title}
                showPersons = {this.state.showPersons}
                persons = {this.state.persons}
                login = {this.lognHandler}
                clicked = {this.togglePersonsHandler} />
                <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
          </Aux>
          // </WithClass>
      );
      // Ovo ispod je ustvari ono u šta se renderuje JSX kod
      // return React.createElement('div', {className: 'App'}, React.createElement('h3', null, 'Howdy hoo!'));
    }
}

export default withClass(App, classes.App);
