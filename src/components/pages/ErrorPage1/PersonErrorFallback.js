import React from 'react'; 


/////////////////////////////////////////////////////////////////////////////
//
//  To avoid potentially rerendering ErrorBoundary children every time 
//  the ErrorBoundary key changes (but no error), we can use resetErrorBoundary
//  (instead of putting a key on the ErrorBoundary).
//
//  Unfortunately, the parent component's dat will still be missing properties that are 
//  responsible for the error, so for this demo we also need to use an onReset prop on the
//  ErrorBoundary
//
//
//    <ErrorBoundary FallbackComponent={PersonErrorFallback} onReset={handleReset}>
//
// 
//  resetErrorBoundary seems to be passed in through react-error-boundary magic.
//
/////////////////////////////////////////////////////////////////////////////


export function PersonErrorFallback({ error, resetErrorBoundary }){
  return (
    <div className="mx-auto mb-5 alert alert-red text-center border border-red rounded-3 shadow-sm" style={{ maxWidth: 400 }}>
      <h5 className='alert-header' style={{ fontSize: 32, fontFamily: 'Creepster' }}>Error! Could Not Load.</h5>

      { error.message && <p>{ error.message }</p> }

      <button className="d-block mx-auto btn btn-red" onClick={resetErrorBoundary}>Reset</button>
    </div>
  );
}

