import React from 'react'; 


export function ErrorPage1Notes(props){
  return (
    <React.Fragment>
      <article className="article">
        <h2 className="mb-5 text-white-3d">When to Use:</h2>


        <p>Runtime errors during rendering could put our application in a broken state.
        Such an error causes React unmount the entire component tree.
        A class component that implements either one or both of the lifecycle 
        methods <code>getDerivedStateFromError</code> or <code>componentDidCatch</code> becomes
        an error boundary.</p>


        <p>The static method <code>getDerivedStateFromError</code> method is used to render a
        fallback UI after an error is thrown. The <code>componentDidCatch</code> method is used
        to log the error information.</p>


        <p>Because this kind of malfunction is a runtime error, it means that 
        in many cases error boundaries are not necessary, as long as 
        you <strong>code the component correctly</strong>. Thus, give the following implementation:</p>


        <pre><code>{`
  export function Person(props){
    return (
      <div>{ props.data.person.name }</div>
    );
  }
        `}</code></pre>


        <p>It will break when used with:</p>

        <pre><code>{`
  <Person />

  <Person data={{}} />
        `}</code></pre>


        <p>The first case was an oversight, and would likely get discovered during testing.
        The second case could be a result of data not existing in a response object.
        The simple solution is to implement <code>&#60;Person /&#62;</code> in a more
        flexible manner.</p>


        <pre><code>{`
  // Optional chaining is supported by CRA 3.3+.

  export function Person(props){
    return (
      <div>{ props.data?.person?.name }</div>
    );
  }
        `}</code></pre>

        
        <p>This will show the component with missing data (which is not ideal), but at least it won't
        break the entire app. Thus in many cases, if one codes defensively, then 
        there's no need to use error boundaries.</p>
      </article>


      <article className="article">
        <h2 className="mb-5 text-white-3d">Example:</h2>


         <p>Let's say that there was a genuinely good reason for an error boundary.
          Currently, I can't think of one, so I'll go back to the 
          bad <code>&#60;Person /&#62;</code> implementation. We can now create
          an error boundary component.</p>


          <pre><code>{`
  class ErrorBoundary extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        hasError: false 
      }
    }
  
    static getDerivedStateFromError(error){
      return { hasError: true }
    }
  
    componentDidCatch(error, errorInfo){
      // Send error info to logging service.
      console.log('Logging', error, errorInfo);
    }
    
    render(){
      if (this.state.hasError){
        return (
          <div className="mx-auto mb-5 alert alert-red text-center border border-red rounded-3 shadow-sm" style={{ maxWidth: 400 }}>
            <h5 className='alert-header' style={{ fontSize: 32, fontFamily: 'Creepster' }}>Error!</h5>
            <p className="mb-0">Could not load component.</p>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
        `}</code></pre>


        <p>Then we can wrap it around <code>&#60;Person /&#62;</code>.</p>


        <pre><code>{`
  <ErrorBoundary>
    <Person />
  </ErrorBoundary>
        `}</code></pre>


          


          <p>Now if a runtime error occurs (i.e., TypeError, etc), we can contain it, and it won't
          break the entire app.</p>


          <div className="horizontal-ruler">
            <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
            <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
            <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          </div> 


          <p>The main issue I have with this is that if you're creating an error boundary in 
          anticipation of some potential error, then you should be able to code for it
          defensively without having to use an error boundary component. At least, that's
          my opinion.</p>
       </article>


       <article className="article">
        <h2 className="mb-5 text-white-3d">Reusable ErrorBoundary:</h2>


        <p>While there is nothing wrong with the previous implementation of 
        the <code>ErrorBoundary</code> component, we can make it more flexible,
        such that it can be reused for in many different situations.</p>


        <pre><code>{`
  function PersonErrorFallback({ error }){
    console.log("Error: ", error);
    return (
      <div className="mx-auto mb-5 alert alert-red text-center border border-red rounded-3 shadow-sm" style={{ maxWidth: 400 }}>
        <h5 className='alert-header' style={{ fontSize: 32, fontFamily: 'Creepster' }}>Error! Could Not Load.</h5>
  
        { error.message && <p className="mb-0">{ error.message }</p> }
      </div>
    );
  }
  
  
  class ErrorBoundary extends React.Component {
    state = { error: null };
  
    static getDerivedStateFromError(error){
      return { error }
    }
  
    componentDidCatch(error, errorInfo){
      // Send error info to logging service.
      console.log('Logging', error, errorInfo);
    }
    
    render(){
      const { FallbackComponent } = this.props;
      const { error } = this.state;
      if (!error){ return this.props.children; }
  
  
      return <FallbackComponent error={error} />;
    }
  }
        `}</code></pre>


        <p>Now we can use it as follows:</p>


        <pre><code>{`
  <ErrorBoundary FallbackComponent={PersonErrorFallback}>
    <Person />
  </ErrorBoundary>
        `}</code></pre>
      </article>



      <article className="article">
        <h2 className="mb-5 text-white-3d">Upgrading to react-error-boundary:</h2>


        <p>Instead of coding our own error boundaries all the time, it's easier to simply
        use <code>react-error-boundary</code>. Because the previous 
        custom <code>ErrorBoundary</code> component was similar in nature 
        to <code>react-error-boundary</code>, all we actually
        have to do is import the package, and remove the custom version.</p>


        <p>With that done, we can actually make a few extra changes. Here, we
        are receiving <code>resetErrorBoundary</code> from <code>react-error-boundary</code>.
        This can be used to reset the error boundary (instead of using a <code>key</code> property
        on the <code>ErrorBoundary</code>).</p>


        <pre><code>{`
  function PersonErrorFallback({ error, resetErrorBoundary }){
    console.log("Error: ", error);
    return (
      <div className="mx-auto mb-5 alert alert-red text-center border border-red rounded-3 shadow-sm" style={{ maxWidth: 400 }}>
        <h5 className='alert-header' style={{ fontSize: 32, fontFamily: 'Creepster' }}>Error! Could Not Load.</h5>
  
        { error.message && <p>{ error.message }</p> }
  
        <button className="d-block mx-auto btn btn-red" onClick={resetErrorBoundary}>Reset</button>
      </div>
    );
  }
        `}</code></pre>


        <p>However, the actual issue that caused the error in this case is still the missing properties
        on the <code>data</code> object. Admittedly, this demo is contrived, but to fix this issue we
        can pass an <code>onReset</code> prop to the <code>Errorboundary</code>. <code>react-error-boundary</code> will 
        then call this <code>resetErrorBoundary</code> is invoked.</p>



        <pre><code>{`
  const handleReset = () => {
    setData({ person: { name: 'Bazooka Joe' } });
  };

  ...

  <ErrorBoundary FallbackComponent={PersonErrorFallback} onReset={handleReset}>
    <Person data={data} />
  </ErrorBoundary>
        `}</code></pre>

      </article>
    </React.Fragment>     
  );
}
