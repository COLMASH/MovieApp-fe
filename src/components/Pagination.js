import React from 'react'

const Pagination = ({ children, setPage, setErrorMessage, setMovieId, totalResults }) => {
    return (
        <>
            <input
                type="button"
                className="font-black hover:cursor-pointer text-2xl"
                onClick={() => {
                    setPage(page => {
                        return page !== 1 ? --page : page
                    })
                    setErrorMessage('')
                    setMovieId('')
                }}
                value={'<--  '}
            />
            {children}
            <input
                type="button"
                className="font-black hover:cursor-pointer text-2xl"
                onClick={() => {
                    setPage(page => {
                        return page < Math.ceil(totalResults / 10) ? ++page : page
                    })
                    setErrorMessage('')
                    setMovieId('')
                }}
                value={'  -->'}
            />
        </>
    )
}

export default Pagination
