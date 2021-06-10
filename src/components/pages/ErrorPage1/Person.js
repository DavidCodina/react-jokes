import React from 'react'; 


export function Person(props){
  return (
    <div 
      className="alert alert-blue mb-5 mx-auto text-center border border-blue border-2 rounded-3 shadow-sm" 
      style={{ maxWidth: 400 }}
    >{ props.data.person.name }</div>
  );
}
