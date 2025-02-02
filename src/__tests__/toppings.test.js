import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toppings from '@/pages/toppings'
import { useToppings } from '@/hooks/useToppings'

jest.mock('@/hooks/useToppings')

const mockUseToppings = {
    toppings: [],
    loading: false,
    error: null,
    addTopping: jest.fn(),
    updateTopping: jest.fn(),
    deleteTopping: jest.fn(),
}

describe('Toppings Component', () => {
    beforeEach(() => {
        useToppings.mockReturnValue(mockUseToppings)
    })

    test('renders the component', () => {
        render(<Toppings />)
        expect(screen.getByText('Manage Toppings')).toBeInTheDocument()
        expect(screen.getByText('Create New Topping')).toBeInTheDocument()
    })

    test('shows loading skeletons when loading', () => {
        useToppings.mockReturnValue({ ...mockUseToppings, loading: true })
        render(<Toppings />)
        expect(screen.getAllByRole('status')).toHaveLength(6)
    })

    test('shows error message when there is an error', () => {
        useToppings.mockReturnValue({ ...mockUseToppings, error: 'Failed to fetch toppings' })
        render(<Toppings />)
        expect(screen.getByText('Error: Failed to fetch toppings')).toBeInTheDocument()
    })

    test('adds a new topping', async () => {
        render(<Toppings />)
        fireEvent.click(screen.getByText('Create New Topping'))
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Topping' } })
        fireEvent.submit(screen.getByRole('form'))

        await waitFor(() => {
            expect(mockUseToppings.addTopping).toHaveBeenCalledWith('New Topping')
        })
    })

    test('does not add a new topping if it already exists', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
        
        mockUseToppings.addTopping.mockReset()
        
        useToppings.mockReturnValue({
            ...mockUseToppings,
            toppings: [{ id: 1, name: 'Existing Topping' }],
        })
        
        render(<Toppings />)
        fireEvent.click(screen.getByText('Create New Topping'))
        
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'Existing Topping' } })
        
        const form = screen.getByRole('form')
        fireEvent.submit(form)
    
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Topping already exists')
            expect(mockUseToppings.addTopping).not.toHaveBeenCalled()
        })
    
        alertMock.mockRestore()
    })

    test('updates an existing topping', async () => {
        useToppings.mockReturnValue({
            ...mockUseToppings,
            toppings: [{ id: 1, name: 'Existing Topping' }],
        })
        render(<Toppings />)
        fireEvent.click(screen.getByText('Edit'))
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated Topping' } })
        fireEvent.submit(screen.getByRole('form'))

        await waitFor(() => {
            expect(mockUseToppings.updateTopping).toHaveBeenCalledWith(1, 'Updated Topping')
        })
    })

    test('deletes a topping', async () => {
        useToppings.mockReturnValue({
            ...mockUseToppings,
            toppings: [{ id: 1, name: 'Existing Topping' }],
        })
        render(<Toppings />)
        fireEvent.click(screen.getByText('Delete'))

        await waitFor(() => {
            expect(mockUseToppings.deleteTopping).toHaveBeenCalledWith(1)
        })
    })
})