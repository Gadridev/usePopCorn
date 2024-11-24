import React,{useEffect} from 'react'

export function useKey(callBacks,Key) {
    useEffect(
        function () {
          function Callback(e) {
            if (e.code.toLowerCase() === Key.toLowerCase()) {
              callBacks?.();
              console.log("CLosing movie");
            }
          }
          document.addEventListener("keydown", Callback);
          return function () {
            document.removeEventListener("keydown", Callback);
          };
        },
        [callBacks,Key]
      );
}

