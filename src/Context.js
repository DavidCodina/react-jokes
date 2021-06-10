import React, { createContext } from 'react';
import useLocalStorage          from './hooks/useLocalStorage';


/* =========================================================================
                               Context.js
========================================================================= */


export const Context  = createContext({});
export const Consumer = Context.Consumer;


// React.createContext() returns an object with a Provider and a Consumer.
// The Provider is used here within the Custom Provider, but THEY ARE NOT THE SAME THING.
export const Provider = (props) => {
  const [ loggedIn, setLoggedIn ] = useLocalStorage('loggedIn', false);
  

  return (
    <Context.Provider 
      value={{ 
        loggedIn, setLoggedIn,
      }}
    >
      { props.children }
    </Context.Provider>
  );
};


/* =========================================================================
                             Anti-Pattern
========================================================================= */
////////////////////////////////////////////////////////////////////////////
//
// The problem with this type of implementation is that it creates a race condition
// such that it will sometimes work, and sometimes not work.
//
////////////////////////////////////////////////////////////////////////////


// export const BadProvider = (props) => {
//   const [state, setState] = useState({
//     isLoggedIn: false,
//     userData: null
//   });

//   // Log state updates
//   useEffect( () => { console.log(state); }, [state]);


//   ////////////////////////////////////////////////////////////////////////////
//   //
//   //  property is the name of the property to change within state.
//   //  newValue is the newValue we will assign to the property.
//   //  In place of an actual value, we can pass a function.
//   //  That function will be used to update the value based on the current value.
//   //
//   //  This means that in the current implementation if we actually wanted to pass
//   //  a function we'd have to return it inside of the func.
//   //
//   ////////////////////////////////////////////////////////////////////////////

  
//   const updateState = (property, newValue) => {
//     console.log('updateState() called.');

//     if (typeof newValue === 'function'){
//       const func = newValue;
//       setState(currentState => {
//         return {
//           ...currentState,
//           [property] : func(currentState[property])
//         };
//       });
//     }
//     else {
//       setState({ ...state, [property] : newValue });
//     }
//   };


//   return (
//     <Context.Provider value={{ state: state, updateState: updateState }}>
//       { props.children }
//     </Context.Provider>
//   );
// };

