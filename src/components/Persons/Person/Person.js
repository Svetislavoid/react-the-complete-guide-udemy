import React, { Component } from 'react';
import classes from './Person.module.css';
import PropTypes from 'prop-types';

// import WithClass from '../../../hoc/WithClass';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import { AuthContext } from '../../../containers/App'

class Person extends Component {
    constructor(props) {
        super(props); // ako koristimo construktor metod moramo odmah da pozovemo super
        console.log('[Person.js] Inside Constructor', props);
        this.inputElement = React.createRef(); // drugi način za kreiranje reference (React 16.3+)
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        if (this.props.position === 0) { // fokusiramo prvi input
            // this.inputElement.focus();
            this.inputElement.current.focus(); // drugi način za kreiranje reference (React 16.3+)
        }
    }

    focus() {
        this.inputElement.current.focus();
    }

    render () {
        console.log('[Person.js] Inside render()');

        return (
            // jedan način je da radimo sa WithClass komponentom, drugi sa Aux i withClass
            // <WithClass classes={classes.Person}>
            <Aux>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I am authenticated</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I am a person (I think).</p>
                <p>My name is {this.props.name} and here is a number {this.props.age}. Here is a random number: {Math.round(Math.random() * 12345)}</p>
                <p>{this.props.children}</p>
                <input
                    ref = {this.inputElement} // drugi način za kreiranje reference (React 16.3+)
                    // ref = {(inp) => {this.inputElement = inp}} // u state pravimo referencu ka input elementu (pravimo property inputElement) da bi u componentDidMount() fokusirali taj input element; najbolje je koristiti samo za stvari kao što je fokusiranje elemenata a ne i stilizovanje
                    type = 'text'
                    onChange = {this.props.changed}
                    value = {this.props.name} />
            </Aux>
            // </WithClass>
        );
    }
};

// ovim definišemo očekivani prop type (uz korišćenje prop-types paketa)
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);
