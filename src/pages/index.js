import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useQuery } from '@apollo/client'
import { GET_DETAILED_FAVORITE_INFO, GET_GENERAL_MOVIES_INFO } from '../graphQL/queries/movies'
import MovieCard from '../components/MovieCard'
import { moviePlaceholder } from '../assets'
import { GET_USER } from '@/graphQL/queries/user'
import { useRouter } from 'next/router'

export default function Home() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movieId, setMovieId] = useState('')
    const [token, setToken] = useState(null)
    const [hasEffectFinished, setHasEffectFinished] = useState(false)
    const router = useRouter()

    useQuery(GET_USER, {
        skip: !hasEffectFinished,
        variables: { token },
        onError: () => router.push('/login')
    })

    const { data, loading } = useQuery(GET_GENERAL_MOVIES_INFO, {
        skip: search === '',
        variables: {
            input: {
                page: 1,
                title: search
            }
        },
        fetchPolicy: 'network-only',
        onError: error => {
            if (search && error.message.includes('Too many results.')) {
                setErrorMessage('Too many results, please by more specific')
                setMovies([])
            } else {
                setErrorMessage('Something went wrong, please try again')
                setMovies([])
            }
        }
    })

    const { data: detailData, loading: detailLoading } = useQuery(GET_DETAILED_FAVORITE_INFO, {
        skip: movieId === '',
        variables: {
            favoriteId: movieId
        },
        fetchPolicy: 'network-only',
        onError: () => {
            setErrorMessage('Something went wrong, please try again')
            setMovieId('')
            setMovies([])
        }
    })

    const handleSearch = e => {
        setErrorMessage('')
        setSearch(e.target.value)
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setHasEffectFinished(true)
    }, [token])

    useEffect(() => {
        if (data) setMovies(data.getGeneralMoviesInfo.movies)
        if (search && data?.getGeneralMoviesInfo?.totalResults === null) {
            setErrorMessage('No results found 🔍')
        }
    }, [data, movies, search, movieId])

    useEffect(() => {
        if (detailData) setMovies(detailData.getDetailedFavoriteInfo.movies)
        if (movieId && detailData?.getDetailedFavoriteInfo?.totalResults === null) {
            setErrorMessage('No results found 🔍')
        }
    }, [detailData, movies, movieId])

    return (
        <div>
            <Layout>
                <h1 className="text-2xl">🔍 Movies</h1>
                <input
                    className="w-1/2 h-8 rounded pl-2 mt-10 text-black"
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Please type your search"
                ></input>
                {(loading || detailLoading) && <h2 className="my-10 text-2xl">Loading ⌛️...</h2>}
                {errorMessage && <h2 className="my-10 text-2xl">{errorMessage}.</h2>}
                {!detailLoading && movieId && movies
                    ? movies.map(movie => {
                          return (
                              <div
                                  className="grid sm:grid-cols-1 grid-rows-1 gap-5 my-10 justify-items-center items-center"
                                  key={movie.apiId}
                              >
                                  <div
                                      className="hover:cursor-pointer text-2xl"
                                      onClick={() => setMovieId('')}
                                  >
                                      <span className="font-black">{'<--'}</span> Back
                                  </div>
                                  <MovieCard
                                      posterImage={
                                          movie.Poster !== 'N/A' ? movie.Poster : moviePlaceholder
                                      }
                                      title={movie.Title}
                                      year={movie.Year}
                                      type={movie.Type}
                                      actors={movie.Actors}
                                      plot={movie.Plot}
                                      rate={movie.Rating}
                                      apiId={movie.apiId}
                                  />
                              </div>
                          )
                      })
                    : !detailLoading && (
                          <div className="grid sm:grid-cols-3 grid-rows-4 gap-5 my-10">
                              {movies &&
                                  movies.map(movie => {
                                      return (
                                          <div
                                              key={movie.apiId}
                                              onClick={() => setMovieId(movie.apiId)}
                                          >
                                              <MovieCard
                                                  posterImage={
                                                      movie.Poster !== 'N/A'
                                                          ? movie.Poster
                                                          : moviePlaceholder
                                                  }
                                                  title={movie.Title}
                                                  year={movie.Year}
                                                  type={movie.Type}
                                              />
                                          </div>
                                      )
                                  })}
                          </div>
                      )}
            </Layout>
        </div>
    )
}
