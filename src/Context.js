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


  useEffect(() => console.log(jokes), [jokes]);

  const addJoke = (joke) => {
    const newJokes = jokes.filter(value => value.id !== joke.id);
    setJokes([joke, ...newJokes]);
  };


  const removeJoke = (id) => { 
    const newJokes = jokes.filter(value => value.id !== id);
    setJokes(newJokes);
  };
  
  
  // Every time jokes changes, update likedJokes
  useEffect(() => {
    const getLikedJokes = () => { // eslint-disable-line
      const likedJokes = [];
      jokes.forEach(joke => {
        if (joke.liked === true){ likedJokes.push({ ...joke }); }

      });
      return likedJokes;
    };

    const jokesUsersLiked = getLikedJokes();
    setLikedJokes(jokesUsersLiked);
  }, [jokes]);
  

  return (
    <Context.Provider value={{ jokes, addJoke, removeJoke, likedJokes }}>
      { props.children }
    </Context.Provider>
  );
};

