import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RandomJokePage } from '../pages/RandomJokePage';

// import { TodosPage }    from '../pages/TodosPage';
// import { TodoPage  }    from '../pages/TodoPage';

// import { ErrorPage1 }   from '../pages/ErrorPage1';
// import { ErrorPage2 }   from '../pages/ErrorPage2';
// import { ErrorPage3 }   from '../pages/ErrorPage3';
import { NotFoundPage } from '../pages/NotFoundPage';





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

      {/*
      <Route 
        exact path="/todos"
        render={(props) => {
          return <TodosPage {...props} value={value}  />;
        }}
      />

      <Route 
        path="/todos/:id" 
        render={(props) => {
          return <TodoPage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/error1"
        render={(props) => {
          return <ErrorPage1 {...props} value={value}  />
        }}
      />

      <Route 
        exact path="/error2"
        render={(props) => {
          return <ErrorPage2 {...props} value={value}  />
        }}
      />

      <Route 
        exact path="/error3"
        render={(props) => {
          return <ErrorPage3 {...props} value={value}  />
        }}
      />
      */}
      
      

      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

