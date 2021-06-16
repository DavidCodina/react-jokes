import React from 'react'; 


export function LikedJokesPage(props){
  const { value } = props;
  const { likedJokes, removeJoke } = value;


  const renderLikedJokes = () => {
    if (!likedJokes || likedJokes.length === 0){
      return (
        <div
          className="text-blue text-center"
          style={{ fontFamily: 'Montserrat', fontSize: 24, textShadow: '0px 1px 2px rgba(0,0,0,0.25)' }}
        >You haven't liked any jokes yet...</div>
      ); 
    }

    if (likedJokes && likedJokes?.length > 0){
      return likedJokes.map(joke => {
        if (joke?.type === 'twopart'){
          return (
            <div key={joke.id} className="mb-5 mx-auto w-90 p-3 bg-light text-gray border border-gray rounded-4 shadow-sm" style={{ fontSize: 24 }}>
              <p><strong className="font-montserrat text-blue">Set Up:</strong> { joke.setup }</p>
              <p><strong className="font-montserrat text-blue">Delivery:</strong> { joke.delivery }</p>

              <button
                className="d-block mx-auto btn btn-outline-pink"
                onClick={ () => removeJoke(joke.id) }
              >Remove Joke</button>
            </div>
          );
        } else if (joke.type === 'single'){
          return (
            <div key={joke.id} className="mb-5 mx-auto w-90 p-3 bg-light text-gray border border-gray rounded-4 shadow-sm" style={{ fontSize: 24 }}>
              <p><strong className="font-montserrat text-blue">Joke:</strong> { joke.joke }</p>

              <button
                className="d-block mx-auto btn btn-outline-pink"
                onClick={ () => removeJoke(joke.id) }
              >Remove Joke</button>
            </div>
          );
        }

        return null;
      });
    }

    return null;
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Liked Jokes Page</h2>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>


      { renderLikedJokes() }
    </React.Fragment>     
  );
}
