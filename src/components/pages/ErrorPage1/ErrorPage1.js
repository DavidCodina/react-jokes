import React, { useState }     from 'react'; 
import { Person }              from './Person';
import { PersonErrorFallback } from './PersonErrorFallback';
import { ErrorBoundary }       from 'react-error-boundary';
import { ErrorPage1Notes }     from './ErrorPage1Notes';


export function ErrorPage1(props){
  const [data, setData ] = useState({});
  const handleReset      = () => setData({ person: { name: 'Bazooka Joe' } });

  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Error Page 1</h2>

      <ErrorBoundary FallbackComponent={PersonErrorFallback} onReset={handleReset}>
        <Person data={data} />
      </ErrorBoundary>

      <ErrorPage1Notes />
    </React.Fragment>     
  );
}
