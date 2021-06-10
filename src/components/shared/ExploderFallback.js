import React from 'react';
import { HalftoneBackground } from './HalftoneBackground';




export function ExploderFallback({ error, resetErrorBoundary }){
  return (
    <div className="position-relative my-5 mx-auto alert alert-red border border-red shadow-sm" style={{ maxWidth: 400 }}>
      <HalftoneBackground fillColor="rgba(255, 53, 94, 0.1)" />


      <div className="position-relative">
        <span style={{ position: 'absolute', top: 35, left: -10, fontSize: 80, lineHeight: 0 }}>💥</span> 
        <span style={{ position: 'absolute', top: 35, right:-10, fontSize: 80, lineHeight: 0, transform: 'rotate(90deg)' }}>💥</span> 

        <h4 className='alert-header text-center' style={{ fontSize: 40, fontFamily: 'Creepster' }}>Kaboom !!!</h4>

        <div className="mb-3 text-center">
          <svg 
            width="100px" 
            height="100px" 
            viewBox="0 0 1280.000000 1280.000000"
          >
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
              <path d="M3043 11841 c-686 -427 -1262 -952 -1747 -1591 -800 -1053 -1246
              -2313 -1292 -3650 l-7 -200 2241 0 2242 0 0 45 c0 25 5 89 11 143 63 583 374
              1097 855 1413 l94 62 -29 51 c-725 1263 -2204 3812 -2213 3813 -7 1 -77 -38
              -155 -86z"/>
              <path d="M9337 11488 c-404 -701 -1969 -3412 -1973 -3419 -2 -4 33 -30 77 -59
              430 -280 739 -732 838 -1225 22 -110 41 -269 41 -340 l0 -45 2242 0 2241 0 -7
              198 c-23 649 -134 1264 -337 1857 -452 1325 -1323 2461 -2494 3251 -171 115
              -347 224 -362 224 -6 0 -125 -199 -266 -442z"/>
              <path d="M6225 7665 c-675 -94 -1166 -714 -1096 -1382 32 -312 152 -565 370
              -784 219 -218 472 -338 783 -370 360 -38 734 93 1001 350 469 452 527 1168
              137 1690 -275 368 -738 560 -1195 496z"/>
              <path d="M4932 3856 c-1800 -3117 -1726 -2987 -1711 -3001 24 -22 325 -179
              494 -258 679 -315 1358 -497 2136 -574 249 -24 844 -24 1098 1 764 73 1449
              256 2121 566 144 66 464 233 501 261 l22 17 -1078 1868 c-593 1028 -1096 1899
              -1117 1935 l-38 66 -118 -58 c-204 -100 -422 -163 -654 -188 -339 -37 -716 32
              -1032 188 l-116 57 -508 -880z"/>
            </g>
          </svg>
        </div>

        <p className="text-center">You blew up the component!</p>
        <button className="d-block w-100 mx-auto btn btn-red" onClick={resetErrorBoundary}>Reset</button>  
      </div>
    </div>
  );
}
