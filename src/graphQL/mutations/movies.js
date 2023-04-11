import { gql } from '@apollo/client'

export const ADD_MOVIE_TO_FAVORITES = gql`
    mutation AddMovieToFavorites($favoriteId: ID!) {
        addMovieToFavorites(favoriteId: $favoriteId)
    }
`

export const REMOVE_MOVIE_FROM_FAVORITES = gql`
    mutation RemoveMovieFromFavorites($favoriteId: ID!) {
        removeMovieFromFavorites(favoriteId: $favoriteId)
    }
`
