import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pizzas from '@/pages/pizzas'
import { usePizzas } from '@/hooks/usePizzas'
import { useToppings } from '@/hooks/useToppings'

jest.mock('@/hooks/usePizzas')
jest.mock('@/hooks/useToppings')

const mockUsePizzas = {
    pizzas: [],
    loading: false,
    error: null,
    addPizza: jest.fn(),
    updatePizza: jest.fn(),
    deletePizza: jest.fn(),
}

const mockUseToppings = {
    toppings: [
        { id: 1, name: 'Pepperoni' },
        { id: 2, name: 'Mushrooms' },
    ],
    loading: false,
}

describe('Pizzas Component', () => {
    beforeEach(() => {
        usePizzas.mockReturnValue(mockUsePizzas)
        useToppings.mockReturnValue(mockUseToppings)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders the component', () => {
        render(<Pizzas />)
        expect(screen.getByText('Manage Pizzas')).toBeInTheDocument()
        expect(screen.getByText('Create New Pizza')).toBeInTheDocument()
    })

    test('shows loading skeletons when loading', () => {
        usePizzas.mockReturnValue({ ...mockUsePizzas, loading: true })
        render(<Pizzas />)
        expect(screen.getAllByRole('status')).toHaveLength(4)
    })

    test('shows error message when there is an error', () => {
        usePizzas.mockReturnValue({ ...mockUsePizzas, error: 'Failed to fetch pizzas' })
        render(<Pizzas />)
        expect(screen.getByText('Error: Failed to fetch pizzas')).toBeInTheDocument()
    })

    test('adds a new pizza', async () => {
        render(<Pizzas />)
        fireEvent.click(screen.getByText('Create New Pizza'))
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Pizza' } })
        fireEvent.click(screen.getByText('Pepperoni'))
        fireEvent.submit(screen.getByRole('form'))
    
        await waitFor(() => {
            expect(mockUsePizzas.addPizza).toHaveBeenCalledWith("New Pizza", [1])
        })
    })

    test('does not add a new pizza if it already exists', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
        
        usePizzas.mockReturnValue({
            ...mockUsePizzas,
            pizzas: [{ id: 1, name: 'Existing Pizza', toppings: [1] }],
        })
        
        render(<Pizzas />)
        fireEvent.click(screen.getByText('Create New Pizza'))
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Existing Pizza' } })
        const pepperoniCheckbox = screen.getByRole('checkbox', { name: /pepperoni/i })
        fireEvent.click(pepperoniCheckbox)
        fireEvent.submit(screen.getByRole('form'))

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Pizza name already exists')
            expect(mockUsePizzas.addPizza).not.toHaveBeenCalled()
        })

        alertMock.mockRestore()
    })

    test('updates an existing pizza', async () => {
        usePizzas.mockReturnValue({
            ...mockUsePizzas,
            pizzas: [{ id: 1, name: 'Original Pizza', toppings: [1] }],
        })
        
        render(<Pizzas />)
        fireEvent.click(screen.getByText('Edit'))
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated Pizza' } })
        fireEvent.click(screen.getByText('Mushrooms'))
        
        fireEvent.submit(screen.getByRole('form'))
    
        await waitFor(() => {
            expect(mockUsePizzas.updatePizza).toHaveBeenCalledWith(1, "Updated Pizza", [1, 2])
        })
    })

    test('deletes a pizza', async () => {
        usePizzas.mockReturnValue({
            ...mockUsePizzas,
            pizzas: [{ id: 1, name: 'Pizza to Delete', toppings: [1] }],
        })
        
        render(<Pizzas />)
        fireEvent.click(screen.getByText('Delete'))

        await waitFor(() => {
            expect(mockUsePizzas.deletePizza).toHaveBeenCalledWith(1)
        })
    })

    test('shows no pizzas message when list is empty', () => {
        render(<Pizzas />)
        expect(screen.getByText(/No pizzas found/)).toBeInTheDocument()
    })
})