import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage                               from './hooks/useLocalStorage';


/* =========================================================================
                               Context.js
========================================================================= */


export const Context  = createContext({});
export const Consumer = Context.Consumer;


export const Provider = (props) => {
  const [ jokes, setJokes ]           = useLocalStorage('jokes', []); // eslint-disable-line
  const [ likedJokes, setLikedJokes ] = useState([]);                 // eslint-disable-line


  const addJoke = (joke) => {
    // ...
  };


  const removeJoke = (id) => { 
    // ...
  };


  
  // Every time jokes changes, update likedJokes
  useEffect(() => {
    const getLikedJokes = () => { // eslint-disable-line
      // ...
    };


    // set const jokesUserLiked = getLikedJokes();
    // Then  setLikedJokes(jokesUserLiked);
  }, [jokes]);
  

  return (
    <Context.Provider value={{ jokes, addJoke, removeJoke, likedJokes }}>
      { props.children }
    </Context.Provider>
  );
};

