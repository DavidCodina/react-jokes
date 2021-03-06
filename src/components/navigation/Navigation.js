import React             from 'react';
import { NavLink, Link } from 'react-router-dom';
import OffCanvas         from './OffCanvas';


const Navigation = (props) => {
  const headerContent = () => {
    return (
      <Link 
        className="navbar-brand p-0 font-montserrat fs-1 lh-1 link-light" 
        to="/"
      >React Jokes</Link>
    );   
  } 
  
  
  const BodyContent = () => {
    return (
      <nav id="primary-navigation">
        <div className="container-fluid">
          <NavLink className="nav-link" activeClassName="active-link" exact to="/" onClick={OffCanvas.hideOffCanvas}>Random Joke</NavLink>
          <NavLink className="nav-link" activeClassName="active-link"       to="/likedjokes" onClick={OffCanvas.hideOffCanvas}>Liked Jokes</NavLink>
        </div>
      </nav>
    );
  };


  return (
    <OffCanvas 
      title="not used" 
      headerContent={headerContent} 
      bodyContent={BodyContent} 
      backdrop={true} 
      position='start'
      scrollable={false}
      closeButton={true}
      closeButtonTheme='white'
      classes='bg-deep-space'
      style={{ borderRight: '2px solid #000' }}
    />      
  );
};


export default Navigation;
