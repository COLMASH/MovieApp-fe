import { gql } from '@apollo/client'

export const GET_GENERAL_MOVIES_INFO = gql`
    query GetGeneralMoviesInfo($input: MovieInput) {
        getGeneralMoviesInfo(input: $input) {
            movies {
                apiId
                Title
                Type
                Year
                Poster
            }
            totalResults
        }
    }
`
export const GET_DETAILED_FAVORITE_INFO = gql`
    query GetDetailedFavoriteInfo($favoriteId: String) {
        getDetailedFavoriteInfo(favoriteId: $favoriteId) {
            movies {
                Title
                Year
                Type
                Poster
                Plot
                Actors
                Rating
                apiId
            }
            totalResults
        }
    }
`
