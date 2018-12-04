import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map((person, index) => { // sve ovo posle prve => je u return
    return <Person
      click = {() => props.clicked(index)}
      name = {person.name}
      age = {person.age}
      changed = {(event) => props.changed(event, person.id)} />
    });

export default persons;
