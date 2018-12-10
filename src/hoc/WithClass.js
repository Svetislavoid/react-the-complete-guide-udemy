// Ovo je jedan način korišćenja higher order component-e

import React from 'react';

const withClass = (props) => (
    <div className={props.classes}>
        {props.children}
    </div>
);

export default withClass;
