import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../../src/components/Pagination'

describe('Pagination', () => {
    beforeEach(() => {
        render(
            <Pagination
                setPage={page => ++page}
                setErrorMessage={() => 'Error message'}
                setMovieId={() => 'MovieId'}
                totalResults={() => 10}
            >
                {`Total pages`}
            </Pagination>
        )
    })
    it('renders a pagination', () => {
        const arrow = screen.getByText(/-->/i)
        expect(arrow).toBeInTheDocument()
    })
    it('renders a pagination and test if left arrow click is working as expected', () => {
        const arrow = screen.getByText(/-->/i)
        fireEvent.click(arrow)
        expect(arrow).toBeInTheDocument()
    })
    it('renders a pagination and test if right arrow click is working as expected', () => {
        const arrow = screen.getByText(/<--/i)
        fireEvent.click(arrow)
        expect(arrow).toBeInTheDocument()
    })
})
