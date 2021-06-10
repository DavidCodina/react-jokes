import React, { useState, useEffect }  from 'react'; 
import { getData } from '../../../helpers/axios-helper';
import { Icon } from '../../shared';

// https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit


export function RandomJokePage(props){
  const [ error, setError ]     = useState(null);  // eslint-disable-line
  const [ loading, setLoading ] = useState(false); // eslint-disable-line
  const [ joke, setJoke ]       = useState(null);  // eslint-disable-line


  // const { value } = props.value;

  

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


  const handleLike = () => {
    // Add joke object to liked jokes array in global context.
    // alert("Liked");
  };


  const handleDislike = () => {
    // Add joke object to disliked jokes array in global context.
    // alert("Disliked");
  };







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


            <div className="d-flex justify-content-center align-items-center">
              <button className="btn mb-0 p-0 me-2" onClick={handleLike}>
                <Icon name='hand-thumbs-up' size={32} />
              </button>

              <button className="btn mb-0 p-0" onClick={handleDislike}>
                <Icon name='hand-thumbs-down' size={32} />
              </button>
            </div>

            


        
          </div>
        );
      }
    }


    return null;
  };


  // export function Icon({ 
  //   name    = 'question-circle', 
  //   size    = 'inherit', 
  //   color   = 'currentColor', 
  //   classes = '',
  //   style   = {} 
  // }){
  
  //   return (
  //     <i 
  //       className={ classes ? `bi bi-${name} ${classes}` : `bi bi-${name}`} 
  //       style={{ fontSize: size, color: color, ...style }}
  //     ></i>   
  //   );
  // }
 

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
