import React from 'react';

import classes from './Cockpit.module.css';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = classes.Button;

    if (props.showPersons) {
        btnClass = [classes.Button, classes.Red].join(' ');
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <Aux>
            <h1>{props.appTitle}</h1>
            <h3 className={assignedClasses.join(' ')}>Ho</h3>
            <button
                className = {btnClass}
                onClick = {props.clicked}>Toggle Persons</button>
            <button onClick={props.login}>Log in</button>
        </Aux>
    );
};

export default cockpit;
