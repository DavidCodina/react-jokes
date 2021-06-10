import React, { createContext } from 'react';
import useLocalStorage          from './hooks/useLocalStorage';


/* =========================================================================
                               Context.js
========================================================================= */


export const Context  = createContext({});
export const Consumer = Context.Consumer;


export const Provider = (props) => {
  const [ likedJokes,    setLikedJokes    ] = useLocalStorage('likedJokes', []); 
  const [ dislikedJokes, setDislikedJokes ] = useLocalStorage('dislikedJokes', []);
  

  return (
    <Context.Provider 
      value={{ 
        likedJokes,    setLikedJokes,  
        dislikedJokes, setDislikedJokes 
      }}
    >
      { props.children }
    </Context.Provider>
  );
};

