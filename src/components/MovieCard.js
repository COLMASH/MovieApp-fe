import React, { useState } from 'react'
import Image from 'next/image'
import { ADD_MOVIE_TO_FAVORITES, REMOVE_MOVIE_FROM_FAVORITES } from '@/graphQL/mutations/movies'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const MovieCard = ({
    title,
    year,
    posterImage,
    type,
    actors,
    rate,
    plot,
    apiId,
    setMovieId,
    refetch
}) => {
    const [message, setMessage] = useState('')
    const [addMovieToFavorites] = useMutation(ADD_MOVIE_TO_FAVORITES)
    const [removeMovieFromFavorites] = useMutation(REMOVE_MOVIE_FROM_FAVORITES)
    const route = useRouter()

    const handleAddToFavorites = async () => {
        await addMovieToFavorites({
            variables: {
                favoriteId: apiId
            },
            onError: () => {
                setMessage('Something went wrong, please try again')
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            },
            onCompleted: data => {
                setMessage(data.addMovieToFavorites)
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            }
        })
    }

    const handleRemoveFromFavorites = async () => {
        await removeMovieFromFavorites({
            variables: {
                favoriteId: apiId
            },
            onError: error => {
                if (error.message.includes("Movie hasn't been found")) {
                    setMessage('Movie already removed from favorites')
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                } else {
                    setMessage('Something went wrong, please try again')
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                }
            },
            onCompleted: data => {
                setMessage(data.removeMovieFromFavorites)
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            }
        })
        setMovieId('')
        await refetch()
    }

    const showMessage = () => {
        return (
            <div className="bg-red-500 py-3 px-3 w-full mb-5 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-xl hover:cursor-pointer">
            {actors && route.asPath === '/' && (
                <input
                    type="button"
                    className="bg-red-800 w-full mb-5 p-2 text-white hover:cursor-pointer hover:bg-red-400"
                    value="Add to favorites"
                    onClick={handleAddToFavorites}
                />
            )}
            {actors && route.asPath === '/favorites' && (
                <input
                    type="button"
                    className="bg-red-800 w-full mb-5 p-2 text-white hover:cursor-pointer hover:bg-red-400"
                    value="Remove from favorites"
                    onClick={handleRemoveFromFavorites}
                />
            )}
            {message && showMessage()}
            <Image className="w-full" src={posterImage} alt={title} height={500} width={500} />
            <div className="px-6 py-4">
                {title && <h1 className="font-bold text-xl mb-2">{title}</h1>}
                {type && <p>{`Type: ${type}`}</p>}
                {rate && <p>{`Rate (IMDB): ${rate}`}</p>}
                {year && <p>{`Release year: ${year}`}</p>}
                {actors && <p>{`Cast: ${actors}`}</p>}
                {plot && <p>{`Plot: ${plot}`}</p>}
            </div>
        </div>
    )
}

export default MovieCard
