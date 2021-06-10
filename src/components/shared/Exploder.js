import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';


//////////////////////////////////////////////////////////////////////////////
//
//  Typically, Error Boundaries do not catch errors for event handlers and async code.
//  However, react-error-boundary allows us to use the ErrorBoundary for such errors as well.
//  In order to render ExploderFallback when we throw new Error here (i.e. non-render-time error),
//  we need to invoke the react-error-boundary useErrorHandler() hook, then pass the err to
//  the invocation: handleError(err);
//
//  useErrorHandler() is receiving the err, then throwing
//  it's own error with the error object that we passed it.
//
//      function useErrorHandler(givenError?: unknown): (error: unknown) => void {
//        const [error, setError] = React.useState<unknown>(null)
//        if (givenError != null) throw givenError
//        if (error != null) throw error
//        return setError
//      }
//
//
//  Ultimately this results in an Uncaught Error. 
//  This may come as a surprise to you if you're looking at the developer console.
//  Especially since we actually caught the error:
//
//      catch(err){
//        console.log("error caught!");
//        handleError(err);
//      }
//
//
//  The point is that this is the intended behavior.
//  Presumably, this then causes a render-time error, and triggers the ErrorBoundary.
//  It causes a render-time because the component attempts to rerender as a result
//  of the error being updated with setError(), but precisely because the hook's 
//  error state is now set, an error is thrown BEFORE THE COMPONENT IS RENDERED, and
//  this causes a render-time error, which then triggers the ErrorBoundary.
//
//  react-error-boundary 'catches' the error, and then runs any onError handler we have:
//
//      componentDidCatch(error: Error, info: React.ErrorInfo) {
//        this.props.onError?.(error, info)
//      }
//
//
//! The point here is that componentDidCatch isn't supposed to literally catch the errors.
//! That's the default behavior of how it works in standard React.
//!
//! https://reactjs.org/docs/react-component.html#componentdidcatch
//! Production and development builds of React slightly differ in the way componentDidCatch() 
//! handles errors. On development, the errors will bubble up to window, this means that any window.onerror 
//! or window.addEventListener('error', callback) will intercept the errors 
//! that have been caught by componentDidCatch().
//!
//!      // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
//!      // https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror
//!      window.onerror = function(message, source, lineno, colno, error){
//!        console.log("Caught an error:");
//!        console.log('message: ', message);
//!        console.log('source: ', source);
//!        console.log('lineno: ', lineno);
//!        console.log('colno: ', colno);
//!        console.log('error: ', error);
//!      }; 
//!
//!
//! On production, instead, the errors will not bubble up, which means any ancestor error handler will 
//! only receive errors not explicitly caught by componentDidCatch().
//
//////////////////////////////////////////////////////////////////////////////


export function Exploder(){
  const [count, setCount] = useState(3);
  const EXPLODE_AT        = 1;
  const handleError       = useErrorHandler();


  const increment = () => {
    try {
      if (count === EXPLODE_AT){ throw new Error('Kaboom!'); } 

      setCount(currentCount => currentCount -= 1);
    } catch(err){
      handleError(err); //i.e. setError() returned from useErrorHandler()
    }
  }

  return (
    <React.Fragment>
      <button 
        className="d-block mx-auto mb-3 btn btn-outline-gray" 
        onClick={increment}
      >Explode in: {count}</button>
    </React.Fragment>
  );
}
