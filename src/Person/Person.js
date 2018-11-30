import React from 'react';
import classes from './Person.module.css';

const person = (props) => {
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I am a person (I think).</p>
            <p>My name is {props.name} and here is a number {props.age}. Here is a random number: {Math.round(Math.random() * 12345)}</p>
            <p>{props.children}</p>
            <input type='text' onChange={props.changed} value={props.name} />
        </div>
    );
};

export default person;
