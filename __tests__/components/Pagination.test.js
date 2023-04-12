import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../../src/components/Pagination'

describe('Pagination', () => {
    beforeEach(() => {
        render(
            <Pagination
                setPage={(page = 1) => ++page}
                setErrorMessage={() => 'Error message'}
                setMovieId={() => 'MovieId'}
                totalResults={() => 10}
            >
                {`Total pages`}
            </Pagination>
        )
    })
    it('-1- test if children is rendered correctly', () => {
        const children = screen.getByText(/Total pages/i)
        expect(children).toBeInTheDocument()
    })
    it('-2- test left arrow click', () => {
        const leftArrow = screen.getByText(/<--/i)
        fireEvent.click(leftArrow)
        expect(leftArrow).toBeInTheDocument()
    })
    it('-3- test right arrow click', () => {
        const rightArrow = screen.getByText(/-->/i)
        fireEvent.click(rightArrow)
        expect(rightArrow).toBeInTheDocument()
    })
})
