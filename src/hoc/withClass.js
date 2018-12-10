// Ovo je drugi način korišćenja higher order component-e

import React, {Component} from 'react';

// stateless component
// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// };

// statefull component
// const withClass = (WrappedComponent, className) => {
//     return class extends Component {
//         render() {
//             return (
//                 <div className={className}>
//                     <WrappedComponent {...this.props} />
//                 </div>
//             )
//         }
//     }
// };

// ako prebacujemo referencu iz komponente u komponentu
const withClass = (WrappedComponent, className) => {
    const WithClass = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }

    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />
    })
};

export default withClass;
