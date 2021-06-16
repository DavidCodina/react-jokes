import React, { useState, useEffect, useCallback } from 'react';
import { getData }                                 from '../../../helpers/axios-helper';
import { Icon }                                    from '../../shared';


function containsObject(obj, arr, property){ 
  for (let i = 0; i < arr.length; i++){
    const currentObj = arr[i];
    if (currentObj[property] === obj[property]){ return true; }
  }
  return false;
}


export function RandomJokePage(props){
  const { value }                = props;
  const { jokes, addJoke }       = value;    
  const [ error, setError ]      = useState(null);  
  const [ loading, setLoading ]  = useState(false); 
  const [ joke, setJoke ]        = useState(null);  
  const [ category, setCategory] = useState('any'); 
  

  const handleLike = () => {
    const likedJoke = { ...joke, liked: true };
    addJoke(likedJoke);
  };


  const handleDislike = () => {
    const dislikedJoke = { ...joke, liked: false };
    addJoke(dislikedJoke);
  };
  

  const handleSelectChange = (e) => { 
    setCategory(e.target.value);
  };


  const _getJoke = (self, attempt = 1, maxAttempts = 3) => {
    if (!self || typeof self !== 'function'){ throw new Error('The first argument to getJoke, must be getJoke itself.'); }

    setLoading(true);
    setError(null);

    getData(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`)
    .then(res => {
      const joke = res.data;
      if ( containsObject(joke, jokes, 'id') && attempt < maxAttempts){
        self(self, attempt + 1);
      } else {
        setLoading(false);
        setJoke(joke);
      }
    })
    .catch(err => {
      setLoading(false);
      setError(err);
      setJoke(null);
    });
  };

  const getJoke = useCallback(_getJoke, [jokes, category]);


  useEffect(() => { getJoke(getJoke); }, [getJoke]);


  const renderJoke = () => {
    if (error){
      return (
        <div className="w-90 mx-auto alert alert-red text-center border border-red rounded-4 shadow-sm" role="alert">
          <h2 className="alert-header" style={{ fontFamily: 'Creepster', fontSize: 32 }}>Error!!!</h2>
          <p className="mb-0">Something Went Wrong... Could not get joke.</p>
        </div> 
      ); 
    }


    if (loading){
      return <div className="font-montserrat text-blue text-center" style={{ fontSize: 32 }}>Loading...</div>;
    }


    if (joke){
      const buttonsContainer = (
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn mb-0 p-0 me-2" onClick={handleLike}>
            <Icon name='hand-thumbs-up' style={{}} />
            <span className="visually-hidden">Like Button</span>
          </button>

          <button className="btn mb-0 p-0" onClick={handleDislike} >
            <Icon name='hand-thumbs-down' style={{}}  />
            <span className="visually-hidden">Dislike Button</span>
          </button>
        </div>
      );


      if (joke?.type === 'twopart'){
        return (
          <div className="mb-5 mx-auto w-90 p-3 bg-light text-gray border border-gray rounded-4 shadow-sm" style={{ fontSize: 24 }}>
            <p><strong className="font-montserrat text-blue">Set Up:</strong> { joke.setup }</p>
            <p className="mb-0"><strong className="font-montserrat text-blue">Delivery:</strong> { joke.delivery }</p>
            { buttonsContainer }
          </div>
        );
      } else if (joke.type === 'single'){
        return (
          <div className="mb-5 mx-auto w-90 p-3 bg-light text-gray border border-gray rounded-4 shadow-sm" style={{ fontSize: 24 }}>
            <p className="mb-0"><strong className="font-montserrat text-blue">Joke:</strong> { joke.joke }</p>
            { buttonsContainer }
          </div>
        );
      }
      // Otherwise...
      return null; // Failsafe if there is more types than 'single' and 'twopart'.
    }

    return null;
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Random Joke</h2>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>


      <label htmlFor="category-select" className="visually-hidden">Select Joke Category</label>


      <select
        id="category-select"
        className="w-90 mx-auto mb-4 form-select text-gray"
        style={{ maxWidth: 300 }}
        value={category}
        onChange={handleSelectChange}
      >
        <option value="any">Any</option>
        <option value="misc">Miscallaneous</option>
        <option value="programming">Programming</option>
        <option value="dark">Dark</option>
        <option value="pun">Pun</option>
        <option value="spooky">Spooky</option>
        <option value="christmas">Christmas</option>
      </select>

      { renderJoke() }
    </React.Fragment>     
  );
}
