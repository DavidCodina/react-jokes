import React, { useState, useEffect } from 'react';
import { Link }                       from 'react-router-dom';
import { getData }                    from '../../../helpers/axios-helper';
import { Spinner }                    from '../../shared';


export function TodosPage(props){
  const [ todos, setTodos ]               = useState([]);
  const [ todosLoading, setTodosLoading ] = useState(false);
  const [ todosError, setTodosError ]     = useState(null);

  
  useEffect(() => {
    setTodosError(null);
    setTodosLoading(true);

    setTimeout(() => { //! Simulate delayed response.
      getData(`${process.env.REACT_APP_SERVER}/list_todos`)
        .then(res  => {
          setTodosLoading(false);
          setTodos(res.data);
        })
        .catch(err => { 
          setTodosLoading(false);
          setTodos([]);
          setTodosError(err);
          console.error("Don't forget to start the json server."); 
        });
    }, 1000);   
  }, []);


  const renderTodos = () => {
    if (todosError){ 
      return (
        <div className="text-red text-center">
          <h2 style={{ fontFamily: 'Creepster' }}>Something went wrong!</h2>
          { todosError && todosError.message && <p className="mb-0">{ todosError.message }</p> }
        </div>
      ); 
    } 

    if (todosLoading){ 
      return (
        <Spinner 
          size={75} 
          variant="pink" 
          style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }} 
          containerClasses="d-inline-block"
          containerStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          useContainer={false}
        />
      ); 
    } 

    if (Array.isArray(todos) && todos.length > 0){
      return (
        <ul className="todos-list w-90 mx-auto mb-5 list-group list-group-flush border border-dark rounded-3 shadow-sm overflow-hidden">
          {
            todos.map(todo => {
              return (
                <li className="d-flex align-items-center list-group-item list-group-item-action" key={todo.id}>
                  <Link 
                    className="custom-link" 
                    to={{ 
                      pathname: `/todos/${todo.id}`,           
                      search: `?title=${todo.title}`  
                    }}
                  >{ todo.title }</Link>
                </li>
              )
            })
          }
        </ul> 
      );
    }

    return null;
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Todos</h2>

      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>

      { renderTodos() }
    </React.Fragment>     
  );
}
