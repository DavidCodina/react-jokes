import { useEffect, useRef } from 'react';


function useEffectOnce(func){
  const mounted = useRef(false);
   
  useEffect(() => {
    if (mounted.current === false){
      mounted.current = true;
      if (func && typeof func === 'function'){ 
        func(); 
      }
    } 
  }); 
}


export default useEffectOnce;
