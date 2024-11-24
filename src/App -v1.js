import { useEffect, useRef, useState } from "react";
import "./index.css";
import StarRatings from "./StarRatings";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//_______APP________
export default function App() {
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);
  const { movies, isloading, error } = useMovies(query, handelCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const [watched, setWatched] = useState(function () {
  //   const data = localStorage.getItem("watched");
  //   return JSON.parse(data);
  // });

  function handelSelectMovie(movieId) {
    setSelectId((selectId) => (movieId === selectId ? null : movieId));
  }
  function handelCloseMovie() {
    setSelectId(null);
  }
  function handelAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handelRemoveWatch(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </Navbar>
      <Main>
        {/* <Box  element={<MoviesList movie={movies} />}/>
        <Box element={<WatchList watched={watched} />} /> */}
        <Box>
          {/* {isloading ? <Loader /> : <MoviesList key={"1"} movies={movies} />} */}
          {isloading && <Loader />}
          {!isloading && !error && (
            <MoviesList
              key={movies.imdbID}
              movies={movies}
              onSelectMovie={handelSelectMovie}
            />
          )}
          {error && <Errormsg message={error} />}
        </Box>
        <Box>
          {selectId ? (
            <MovieDetails
              selectId={selectId}
              handelCloseMovie={handelCloseMovie}
              onAddWatch={handelAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchList
                key={"2"}
                watched={watched}
                ondeleteMovie={handelRemoveWatch}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Search({ query, setQuery }) {
  const elInp = useRef(null);
  useKey(function () {
    if (document.activeElement === elInp.current) return;
      elInp.current.focus();
      setQuery("")
    },"Enter");
  // useEffect(function () {
  //   function callBack(e) {}
  //   document.addEventListener("keydown", callBack);
  //   return () => document.addEventListener("keydown", callBack);
  // }, []);
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search moviess..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={elInp}
      />
    </>
  );
}
function Errormsg({ message }) {
  return (
    <p className="error">
      <span>⛔️</span>
      {message}
    </p>
  );
}
function Loader() {
  return <p className="loader">Loading ...</p>;
}
function Logo() {
  return (
    <>
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    </>
  );
}
function Result({ movies }) {
  return (
    <>
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </>
  );
}
function Navbar({ children }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </>
  );
}
function MoviesList({ movies, onSelectMovie }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movies) => (
          <ChildMov
            movies={movies}
            key={movies.imdbID}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </>
  );
}
function ChildMov({ movies, onSelectMovie }) {
  return (
    <>
      <li onClick={() => onSelectMovie(movies.imdbID)} key={movies.imdbID}>
        <img src={movies.Poster} alt={`${movies.Title} poster`} />
        <h3>{movies.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movies.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && <>{children}</>}
      </div>
    </>
  );
}
function MovieDetails({ selectId, handelCloseMovie, onAddWatch, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setloading] = useState(false);
  const [userRating, setuserRating] = useState("");
  const counterRef = useRef(0);
  useEffect(
    function () {
      if (userRating) counterRef.current = counterRef.current + 1;
    },
    [userRating]
  );
  const isWatched = watched.map((watch) => watch.imdbID).includes(selectId);

  const watchUserRating = watched.find(
    (movie) => movie.imdbID === selectId
  )?.userRating;
  console.log(isWatched);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating: imdbRating,
    Plot: plot,
    Released: release,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  function handleAdd() {
    const newMovie = {
      imdbID: selectId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      counterRatingDecisions: counterRef.current,
    };
    onAddWatch(newMovie);
    handelCloseMovie();
  }
  useKey(handelCloseMovie, "Escape");
  useEffect(
    function () {
      async function getMovieDetails() {
        setloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=b1339a0a&i=${selectId}`
        );
        const data = await res.json();
        setMovie(data);
        setloading(false);
      }
      getMovieDetails();
    },
    [selectId]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <>
      <div className="details">
        {loading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button
                type="buttom"
                className="btn-back"
                onClick={handelCloseMovie}
              >
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${movie}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {release} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} Imdb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRatings
                      maxRating={10}
                      onSetRating={setuserRating}
                      size={24}
                      on
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p style={{ textAlign: "center" }}>
                    {" "}
                    You rated with movie {watchUserRating}
                    <span>✨</span>
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
      ;
    </>
  );
}
function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
    </>
  );
}
function WatchList({ watched, ondeleteMovie }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <ChildWatch
            key={movie.Year}
            movie={movie}
            ondeleteMovie={ondeleteMovie}
          />
        ))}
      </ul>
    </>
  );
}
function ChildWatch({ movie, ondeleteMovie }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => ondeleteMovie(movie.imdbID)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
}

function Main({ children }) {
  return (
    <>
      <main className="main movie={movies}">{children}</main>
    </>
  );
}
