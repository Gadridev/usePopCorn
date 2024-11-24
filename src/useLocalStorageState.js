import React, { useEffect, useState } from 'react'

export function useLocalStorageState(initialState,key) {
    const [value, setvalue] = useState(function () {
        const data = localStorage.getItem(key);
        console.log(data)
        return data ?  JSON.parse(data) :initialState
      });
      useEffect(
        function () {
          localStorage.setItem(key, JSON.stringify(value));
        },
        [value,key]
      );

      return [value,setvalue]
  
}
