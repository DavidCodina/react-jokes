import React              from 'react';
import { Route, Switch }  from 'react-router-dom';
import { RandomJokePage } from '../pages/RandomJokePage';
import { LikedJokesPage } from '../pages/LikedJokesPage';
import { NotFoundPage }   from '../pages/NotFoundPage';




const Router = (props) => {
  const { value } = props;

  return (
    <Switch>  
      <Route 
        exact path="/"
        render={(props) => {
          return <RandomJokePage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/likedjokes"
        render={(props) => {
          return <LikedJokesPage {...props} value={value}  />;
        }}
      />
      
      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

