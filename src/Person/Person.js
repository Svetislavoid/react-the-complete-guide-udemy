import React from 'react';
import Radium from 'radium'
import './Person.css';

const person = (props) => {
    const style = {
        '@media (min-width: 500px)' : {
            width: '500px'
        }
    }
    return (
        <div className='Person' style={style}>
            <p onClick={props.click}>I am a person (I think).</p>
            <p>My name is {props.name} and here is a number {props.age}. Here is a random number: {Math.round(Math.random() * 12345)}</p>
            <p>{props.children}</p>
            <input type='text' onChange={props.changed} value={props.name} />
        </div>
    );
};

export default Radium(person);
