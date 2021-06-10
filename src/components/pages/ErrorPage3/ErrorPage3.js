import React           from 'react'; 
import { ExploderHOC } from './ExploderHOC';


// In order to avoid repetitively wrapping components in an <ErrorBoundary />,
// react-error-boundary also allows you to build the functionality into an HOC.


export function ErrorPage3(props){
  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Error Page 3</h2>
      <ExploderHOC />
    </React.Fragment>     
  );
}
