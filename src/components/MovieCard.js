import React, { useState } from 'react'
import Image from 'next/image'
import { ADD_MOVIE_TO_FAVORITES } from '@/graphQL/mutations/movies'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const MovieCard = ({ title, year, posterImage, type, actors, rate, plot, apiId }) => {
    const [message, setMessage] = useState('')
    const [addMovieToFavorites] = useMutation(ADD_MOVIE_TO_FAVORITES)
    const route = useRouter()

    const handleAddToFavorites = async () => {
        const response = await addMovieToFavorites({
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
                console.log(data)
                setMessage(data.addMovieToFavorites)
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            }
        })
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
            {actors && route.asPath !== '/favorites' && (
                <input
                    type="button"
                    className="bg-red-800 w-full mb-5 p-2 text-white hover:cursor-pointer hover:bg-red-400"
                    value="Add to favorites"
                    onClick={handleAddToFavorites}
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
