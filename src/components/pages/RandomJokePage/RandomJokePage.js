import React, { useEffect }  from 'react'; 
import { getData } from '../../../helpers/axios-helper';


// https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit


export function RandomJokePage(props){



  useEffect(() => {
    // ...
  });
 

  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Random Joke</h2>

      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>



      

    </React.Fragment>     
  );
}
