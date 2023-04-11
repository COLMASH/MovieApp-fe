import { gql } from '@apollo/client'

export const NEW_USER = gql`
    mutation NewUser($input: UserInput) {
        newUser(input: $input) {
            name
            lastName
            email
        }
    }
`

export const AUTH_USER = gql`
    mutation AuthUser($input: AuthInput) {
        authUser(input: $input) {
            token
        }
    }
`
