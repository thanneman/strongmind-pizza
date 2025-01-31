import { useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/global/layout'

const initialToppings = [
    { id: 1, name: 'Pepperoni' },
    { id: 2, name: 'Sausage' },
    { id: 3, name: 'Mushrooms' },
    { id: 4, name: 'Onions' },
    { id: 5, name: 'Green Peppers' },
    { id: 6, name: 'Black Olives' },
    { id: 7, name: 'Pineapple' },
    { id: 8, name: 'Spinach' },
]

const initialPizzas = [
    { id: 1, name: 'Pepperoni Pizza', toppings: [1, 6] },
]

export default function Pizzas() {
    const [pizzas, setPizzas] = useState(initialPizzas)
    const [newPizza, setNewPizza] = useState({ name: '', toppings: [] })
    const [availableToppings, setAvailableToppings] = useState([...initialToppings])
    const [editingId, setEditingId] = useState(null)
    const [editingName, setEditingName] = useState('')

    const addPizza = (e) => {
        e.preventDefault()
        if (newPizza.trim() === '') return
        if (pizzas.some((pizza) => pizza.name.toLowerCase() === newPizza.toLowerCase())) {
            alert('Pizza already exists')
            return
        }
        setPizzas([...pizzas, { id: pizzas.length + 1, ...newPizza }])
        setNewPizza('')
    }

    const updatePizza = (id) => {}

    const deletePizza = (id) => {
        setPizzas(pizzas.filter((pizza) => pizza.id !== id))
    }

    return (
        <main className='container max-w-4xl py-6'>
            <div className='flex flex-col mt-10 gap-y-6'>
                <h1 className='self-center text-2xl font-semibold'>Manage Pizzas</h1>
                <div className=''>
                    <form className='flex gap-x-2'>
                    </form>
                </div>
                <div className='flex flex-col gap-y-3'>
                    <h2 className='pb-1 text-xl font-medium border-b border-zinc-200'>Available Pizzas</h2>
                    <ul className='flex flex-col w-full gap-y-1'>
                    </ul>
                </div>
            </div>
        </main>
    )
}

Pizzas.getLayout = (page) => {
    return (<Layout>{page}</Layout>)
}