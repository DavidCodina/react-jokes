import React, { useState, useEffect }  from 'react'; 
import { getData } from '../../../helpers/axios-helper';


// https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit


export function RandomJokePage(props){
  const [ error, setError ]     = useState(null);  // eslint-disable-line
  const [ loading, setLoading ] = useState(false); // eslint-disable-line
  const [ joke, setJoke ]       = useState(null);  // eslint-disable-line
  

  useEffect(() => {
    setLoading(true);
    setError(null);

    // https://httpstat.us/400
    getData('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(res => {
      setLoading(false);
      const joke = res.data;
      setJoke(joke);

      console.log(joke);
    })

    .catch(err => {
      setLoading(false);
      setError(err);
      setJoke(null);
      console.error(err);
    });
  }, []);


  const renderJoke = () => {
    if (error){
      return <div className="text-red text-center" style={{ fontSize: 32, fontFamily: 'Creepster' }}>Something Went Wrong!!!</div>
    }

    if (loading){
      return <div className="text-gray text-center" style={{ fontSize: 32 }}>Loading...</div>
    }

    if (joke){
      if (joke?.type === 'twopart'){
        return (
          <div className="mb-5 mx-auto w-90 p-3 bg-light text-gray border border-gray rounded-4 shadow-sm" style={{ fontSize: 24 }}>
            <p><strong>Set Up:</strong> { joke.setup }</p>
            <p className="mb-0"><strong>Delivery:</strong> { joke.delivery }</p>
          </div>
          

        );
      }


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



      { renderJoke() }



      

    </React.Fragment>     
  );
}
