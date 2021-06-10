import { useReducer, useRef } from 'react';
import axios                  from 'axios';
// import { getData }         from '../helpers/axios-helper';

axios.defaults.validateStatus = function(status){ return true; }; // Default: return status >= 200 && status < 300; 


/* ====================================================================
                            Helpers
==================================================================== */


function getData(url, config){
  config = config || { timeout: 1000 * 25 };
  return axios.get(url, config);
}


// https://flaviocopes.com/how-to-get-timestamp-javascript/
// Return the number of milliseconds since 1970/01/01:
function createTimestamp(){ 
  const timestamp = new Date().getTime();
  return timestamp;
}


function getTimestampDifference(t1, t2){
  // https://humanwhocodes.com/blog/2009/03/10/the-art-of-throwing-javascript-errors-part-2/
  // http://www.javascriptkit.com/javatutors/trycatch2.shtml
  if (typeof t1 !== 'number' || typeof t2 !== 'number'){ throw new Error('getTimestampDifference only accepts numbers.'); }
  let earlierTimestamp = t1;
  let laterTimestamp   = t2;
  if (t1 > t2){
    earlierTimestamp = t2;
    laterTimestamp   = t1;
  }
  const difference = laterTimestamp - earlierTimestamp;
  return difference;
}


function exceedsMaxAge(t1, t2, maxAge){ 
  if (typeof t1 !== 'number' || typeof t2 !== 'number' || typeof maxAge !== 'number'){ 
    throw new Error('exceedsMaxAge only accepts numbers.'); 
  }
  const difference = getTimestampDifference(t1, t2);
  if (difference > maxAge){ return true; }
  return false;
}


/* ====================================================================
                            reducer
==================================================================== */


const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':  
    console.log("Loading at:", new Date().toLocaleTimeString('en-US'));    
      return { 
        ...state, 
        loading: true,
        loaded: false,
        data: null, 
        error: null 
      };

    case 'LOADED_CACHE': 
      console.log("Loaded data from cache at:", new Date().toLocaleTimeString('en-US'));
      return { 
        ...state,         
        loading: false,
        loaded: true,         
        data: action.payload,  
        error: null
      };
    
    case 'LOADED_NEW': 
      console.log("Loaded data from API response at:", new Date().toLocaleTimeString('en-US'));
      return { 
        ...state, 
        loading: false, 
        loaded: true, 
        data: action.payload,
        error: null
      };

    case 'ERROR':    
      console.log("Error occurred at:", new Date().toLocaleTimeString('en-US'));
      return { 
        ...state, 
        loading: false, 
        loaded: false, 
        data: null,
        error: action.payload 
      };

    default: 
      return state;
  }
};


/* ====================================================================
                            useCache
==================================================================== */


const useCache = (maxAge = 1000 * 60 * 5) => {
  ////////////////////////////////////////////////////////////////////////////
  //
  //  https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
  //  Declaring cache in a different scope works. That is using const cache = {};
  //  in the outer scope.
  //
  //  But it makes our hook go against the principle of a pure function: 
  //  https://www.sitepoint.com/functional-programming-pure-functions/
  //  That said, I have removed the reducer into the outer scope because it's 
  //  so much cleaner.
  //
  //  Instead we can declare it within useCache, but then we have
  //  to make sure to implement useRef. With useRef, we can set and retrieve mutable values 
  //  at ease and its value persists throughout the component's lifecycle.
  //
  ////////////////////////////////////////////////////////////////////////////
  const cache = useRef({});

  const initialState = {
    maxAge:  maxAge, // Defaults to 5 minutes.
    loading: false,
    loaded:  false, 
    data:    null,  
    error:   null
  };
  
  const [ state, dispatch ] = useReducer(reducer, initialState);


  const fetchData = (url, config = null, forceRefresh = false) => {
    if (!url){ return; }
    // This prevents calls from bleeding into each other.
    // It also makes it more or less synchronous.
    if (state.loading){ return console.log("Currently loading. Returning early."); }

    
    dispatch({ type: 'LOADING' });

    
    if (!forceRefresh){ // If forceRefresh === false, then check the cache first.
      if (cache.current[url]){
        // Assuming, fetchData is called in a useEffect on page mount, 
        // it will always look for cached data first.
        // This potentially means less API calls -especially for pages
        // that dynamically load content (i.e., a Details Page).
        const cachedData = cache.current[url];
        dispatch({ type: 'LOADED_CACHE', payload: cachedData });
        return; // DO NOT PROCEED IF YOU HAVE CACHED DATA! 
      }
    } 


    setTimeout(() => { // Delayed response for demo only.
      getData(url, config)
      .then(res  => { 
        if (res.status >= 200 && res.status < 300 && res.data){

          // mutate res.data such that it contains a timestamp.
          res.data.cachedAt  = createTimestamp();
          cache.current[url] = res.data;
          dispatch({ type: 'LOADED_NEW', payload: res.data });

          // Cache Busting!
          // Set a timeout here that compares the cachedAt timestamp against now.
          // If now exceeds cachedAt + maxAge, then the data has expired.
          // Unless there has been in intervening foreRefresh, it should have expired.
          setTimeout(function(){
            const now         = createTimestamp(); // Or use cache.current[url].cachedAt + maxAge.
            const dataExpired = exceedsMaxAge(cache.current[url].cachedAt, now, maxAge);
            if (dataExpired){
              console.log(`Deleting cached data with key of: ${url}.`);
              delete cache.current[url];
              // Deleting the cached data doesn't clear the state data.
              // Nor would you want it to. Imagine that you are currently looking at that
              // page and then the data suddenly disappeared.
            } 
            else { console.log(`Data must've been force refreshed. Not deleting: ${url}.`); }
          }, maxAge + 1000);
        } else {
          console.log("Forced the error!");
          ////////////////////////////////////////////////////////////////////////////
          //
          //  Axios is currently set up as follows:
          //  axios.defaults.validateStatus = function(status){ return true; };
          //  This means that NO STATUS CODE WILL GO TO THE CATCH BLOCK.
          //  go to the catch block, in such cases we need to still dispatch an
          //  error action. I may change the Axios implementation later,
          //  but for now we can just force the hook to act as if Axios generated an error.
          //  I just prefer doing it here, rather than letting Axios do it, and forgetting 
          //  what Axios is doing.
          //
          //  There is a difference between a 404 coming from the website, and a 404 coming from the browser
          //  fetchUsers('http://httpstat.us/404');                      // usersDataError: {code: 404, description: "Not Found"}
          //  fetchUsers('https://jsonplaceholder.typicode.com/uzers');  // usersDataError: {}  
          //
          //  Gotcha: In the unlikely event of a 404 Not Found Error that is
          //  generated by the browser res.data becomes {}, and this can potentially break the UI
          //  map() method when the expected data is an array.
          //  Such a situation might also be a good place for an error boundary.
          //
          ////////////////////////////////////////////////////////////////////////////
          dispatch({ type: 'ERROR', payload: res.data });
        }
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: err }); // Would err differ from res.data?
      });
    }, 1000);
  };


  const clearCacheByKey = (key) => {
    console.log("Deleted data with key of: ", key);
    delete cache.current[key];
  };

  return [ state, fetchData, clearCacheByKey ];
};


export default useCache;

