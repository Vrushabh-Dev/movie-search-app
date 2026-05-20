import { useState } from "react"

function App() {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchMovies = async () => {

    try {

      setLoading(true)

      setError("")

      const apiKey = "4c2dddf4"

      const response = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`
      )

      const data = await response.json()

      if(data.Response === "False") {

        setError(data.Error)

        setMovies([])

        return
      }

      setMovies(data.Search)

    }

    // eslint-disable-next-line no-unused-vars
    catch(error) {

      setError("Something went wrong")

    }

    finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-gray-900 p-8">

      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Movie Search App
      </h1>

      <div className="flex justify-center gap-4">

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg text-white"
        />

        <button
          onClick={searchMovies}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Search
        </button>

      </div>

      {
        loading && (
          <h2 className="text-center text-white text-2xl mt-8">
            Loading...
          </h2>
        )
      }

      {
        error && (
          <h2 className="text-center text-red-500 text-2xl mt-8">
            {error}
          </h2>
        )
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">

        {
          movies.map((movie) => (

            <div
              key={movie.imdbID}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >

              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {movie.Title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {movie.Year}
                </p>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default App