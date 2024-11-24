import { useState,useEffect } from "react";
export function useMovies(query,callBack){
    const [movies, setMovies] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [error, setError] = useState("");
    useEffect(
        function () {
            callBack?.()
          const controller = new AbortController();
          async function fetchMovies() {
            try {
              setisloading(true);
              setError("");
              const res = await fetch(
                `http://www.omdbapi.com/?i=tt3896198&apikey=b1339a0a&s=${query}`,
                { signal: controller.signal }
              );
              if (!res.ok) throw new Error("Somthing wrong with fetching movies");
              const data = await res.json();
              if (data.Response === "False") throw new Error("Movie not found");
              setMovies(data.Search);
              setError("");
              console.log(data);
            } catch (err) {
              console.error(err.message);
              if (err.name !== "AbortError") {
                setError(err.message);
              }
              setError(err.message);
            } finally {
              setisloading(false);
            }
          }
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
          fetchMovies();
          return function () {
            controller.abort();
          };
        },
        [query]
      );
      return {movies,isloading,error}
}