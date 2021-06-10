import React  from 'react'; 
import { ErrorBoundary }    from 'react-error-boundary';
import { Exploder, ExploderFallback } from '../../shared';


export function ErrorPage2(props){
  const handleError = (error, errorInfo) => {
    // This is where you'd call your logging service.
    // console.log("Error: ", error);
    // console.log("Error Info: ", errorInfo);
  };


  const handleReset = () => {
    // ...
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Error Page 2</h2>

      <ErrorBoundary FallbackComponent={ExploderFallback} onError={handleError} onReset={handleReset}>
        <Exploder />
      </ErrorBoundary>
    </React.Fragment>     
  );
}
