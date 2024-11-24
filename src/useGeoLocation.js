import React,{useEffect, useState} from 'react'

export function useGeoLocation() {
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});
  
function getPosition(){
    if (!navigator.geolocation)
    return setError("Your browser does not support geolocation");
  
  setIsLoading(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
      setIsLoading(false);
    },
    (error) => {
      setError(error.message);
              setIsLoading(false);
            }
          );
        }     
  return {isLoading,error,position,getPosition}
}
  
      
