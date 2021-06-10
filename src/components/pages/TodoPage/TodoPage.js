import React, { useState, useEffect } from 'react';
import { getData }                    from '../../../helpers/axios-helper';
import getAllUrlParams                from '../../../helpers/getAllUrlParams';
import { Spinner }                    from '../../shared';


function isEmpty(obj){
  for (var prop in obj){
    if (obj.hasOwnProperty(prop)){ return false; }
  }
  return true;
}


export function TodoPage(props){
  const id                              = (props.match.params.id) ? props.match.params.id : '';
  const [ title, setTitle ]             = useState('?');
  const [ todo, setTodo ]               = useState(null);
  const [ todoLoading, setTodoLoading ] = useState(false);
  const [ todoError, setTodoError ]     = useState(null);

  

  // Set title based on value of query parameter.
  useEffect(() => {
    //////////////////////////////////////////////////////////////////////////
    //
    //  props.location.search will be "" if no query string was set on "search" property.
    //  However, without this line if we ran getAllUrlParams(props.location.search)
    //  with an empty string, it would simply return an empty object.
    //
    //////////////////////////////////////////////////////////////////////////
    if (!props.location.search){ return; } 

    //////////////////////////////////////////////////////////////////////////
    //
    //  https://stackoverflow.com/questions/747641/what-is-the-difference-between-decodeuricomponent-and-decodeuri
    //  decodeURIComponent will alsowork on rare characters. For example
    //
    //    let name = '王';
    //    console.log(name); // => 王
    //    name = encodeURIComponent(name);
    //    console.log(name); // => %E7%8E%8B
    //    name = decodeURIComponent(name);
    //    console.log(name); // => 王
    //
    //////////////////////////////////////////////////////////////////////////


    const params = getAllUrlParams(decodeURIComponent(props.location.search));
    if (params.title){ setTitle(params.title); }
  }, [props.location.search]);


  // Set todo based on value of route parameter
  useEffect(() => {
    if (!id){ return; } // There should always be an id, since it's part of the URL, but just in case.
    setTodoError(null);
    setTodoLoading(true);

    setTimeout(() => { //! Simulate delayed response.
      // If possible This should be cancelled when leaving page...
      getData(`${process.env.REACT_APP_SERVER}/todos/${id}`)
        .then(res => { 
          setTodoLoading(false);
          setTodo(res.data);
        })
        .catch(err => { 
          setTodoLoading(false);
          setTodo(null);
          setTodoError(err);
          console.error("Don't forget to start the json server."); 
        });
    }, 1000);    
  }, [id]);


  const renderTodo = () => {
    if (todoError){ 
      return (
        <div className="text-red text-center">
          <h2 style={{ fontFamily: 'Creepster' }}>Something went wrong!</h2>
          { todoError && todoError.message && <p className="mb-0">{ todoError.message }</p> }
        </div>
      ); 
    } 

    if (todoLoading){ 
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

    if (todo !== null && !isEmpty(todo)){
      return (
        <div className="mx-auto mb-5 bg-light p-3 border border-dark rounded-3 shadow-sm" style={{ maxWidth: 600 }}>
          <h4 className="text-gray">Description:</h4>
          <p className="mb-0">{todo.description}</p>
        </div>
      );
    }

    return null;
  };


  return (
    <React.Fragment>
      <h2 className='mt-5 text-white-3d text-center'>{ title }</h2>

      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>

      { renderTodo() }
    </React.Fragment>     
  );
}