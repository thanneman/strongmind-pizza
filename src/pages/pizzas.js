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
    { id: 1, name: 'Pepperoni Onion', toppings: [1, 4] },
    { id: 2, name: 'Pineapple', toppings: [7] },
]

export default function Pizzas() {
    const [pizzas, setPizzas] = useState(initialPizzas)
    const [newPizza, setNewPizza] = useState({ name: '', toppings: [] })
    const [availableToppings, setAvailableToppings] = useState(initialToppings)
    const [editingId, setEditingId] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addPizza = () => {
        if (newPizza.name.trim() === '') return
        if (newPizza.toppings.length === 0) {
            alert('Please select at least one topping')
            return
        }
        if (pizzas.some((pizza) => pizza.name.toLowerCase() === newPizza.name.toLowerCase())) {
            alert('Pizza name already exists')
            return
        }
        if (pizzas.some((pizza) => 
            pizza.toppings.length === newPizza.toppings.length &&
            pizza.toppings.every((topping) => newPizza.toppings.includes(topping))
        )) {
            if (!window.confirm('Pizza with these toppings already exists. Do you want to add it anyway?')) {
                return
            }
        }
        setPizzas([...pizzas, { id: pizzas.length + 1, ...newPizza }])
        setNewPizza({ name: '', toppings: [] })
        setIsDialogOpen(false)
    }

    const updatePizza = (id) => {
        if (newPizza.name.trim() === '') return
        if (newPizza.toppings.length === 0) {
            alert('Please select at least one topping')
            return
        }
        if (pizzas.some((pizza) => pizza.name.toLowerCase() === newPizza.name.toLowerCase() && pizza.id !== id)) {
            alert('Pizza already exists')
            return
        }
        if (pizzas.some((pizza) => 
            pizza.toppings.length === newPizza.toppings.length &&
            pizza.toppings.every((topping) => newPizza.toppings.includes(topping))
        )) {
            if (!window.confirm('Pizza with these toppings already exists. Do you want to add it anyway?')) {
                return
            }
        }
        setPizzas(pizzas.map((pizza) =>
            pizza.id === id ? { ...pizza, name: newPizza.name, toppings: newPizza.toppings } : pizza
        ))
        setEditingId(null)
        setNewPizza({ name: '', toppings: [] })
        setIsDialogOpen(false)
    }

    const handleToppingChange = (toppingId) => {
        setNewPizza((prev) => ({
            ...prev,
            toppings: prev.toppings.includes(toppingId)
                ? prev.toppings.filter((id) => id !== toppingId)
                : [...prev.toppings, toppingId],
        }))
    }

    const deletePizza = (id) => {
        setPizzas(pizzas.filter((pizza) => pizza.id !== id))
    }

    const openDialog = (pizza = { name: '', toppings: [] }) => {
        setNewPizza(pizza)
        setEditingId(pizza.id || null)
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setNewPizza({ name: '', toppings: [] })
        setEditingId(null)
        setIsDialogOpen(false)
    };

    return (
        <main className='container max-w-4xl py-6'>
            <div className='flex flex-col mt-10 gap-y-6'>
                <h1 className='self-center text-2xl font-semibold'>Manage Pizzas</h1>
                <button onClick={() => openDialog()} className='flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded gap-x-0.5 items hover:bg-blue-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg>
                    Create New Pizza
                </button>
                <div className='flex flex-col mt-5 gap-y-3'>
                    <h2 className='text-xl font-medium text-center'>Available Pizzas</h2>
                    <ul className='flex flex-col w-full gap-y-3'>
                        {pizzas.map((pizza) => (
                            <div key={pizza.id} className='p-4 border rounded shadow-sm'>
                                <div className='flex flex-col items-center justify-between xs:flex-row gap-y-2'>
                                    <h3 className='text-base font-semibold md:text-lg'>{pizza.name}</h3>
                                    <div className='flex gap-x-2'>
                                        <button onClick={() => openDialog(pizza)} className='flex justify-center text-sm md:text-base items-center gap-x-0.5 px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-1 2q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"></path></svg>
                                            Edit
                                        </button>
                                        <button onClick={() => deletePizza(pizza.id)} className='flex justify-center text-sm md:text-base items-center gap-x-0.5 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"></path></svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-2 mt-2.5'>
                                    {pizza.toppings.map((toppingId) => {
                                        const topping = availableToppings.find((t) => t.id === toppingId);
                                        return <span key={toppingId} className='px-2 py-1 text-xs bg-gray-200 rounded'>{topping.name}</span>;
                                    })}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            {isDialogOpen && (
                <div className='fixed inset-0 flex justify-center item-center bg-black/50'>
                    <div className='absolute flex flex-col w-3/4 lg:w-1/2 max-w-[600px] p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md top-1/2 left-1/2'>
                        <div className='flex items-start justify-between'>
                            <h2 className='mb-4 text-xl font-semibold'>{editingId ? 'Edit Pizza' : 'Add Pizza'}</h2>
                            <button onClick={closeDialog} className='text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" className='-mt-2'><path fill="currentColor" d="m12 13.4l-2.917 2.925q-.277.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.831 7.4 8.404t.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.277-.275.704-.275t.704.275q.3.3.3.713t-.3.687L13.375 12l2.925 2.917q.275.277.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"></path></svg>
                            </button>
                        </div>
                        <div>
                            <form onSubmit={(e) => { e.preventDefault(); editingId ? updatePizza(editingId) : addPizza(); }} className='flex flex-col gap-y-4'>
                                <input
                                    type='text'
                                    value={newPizza.name}
                                    onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
                                    placeholder='Pizza Name'
                                    className='p-2 border rounded'
                                />
                                <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
                                    {availableToppings.map((topping) => (
                                        <label key={topping.id} className='flex items-center text-sm md:text-base'>
                                            <input
                                                type='checkbox'
                                                checked={newPizza.toppings.includes(topping.id)}
                                                onChange={() => handleToppingChange(topping.id)}
                                                className='mr-2'
                                            />
                                            {topping.name}
                                        </label>
                                    ))}
                                </div>
                                <button type='submit' className='py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                                    {editingId ? 'Update Pizza' : 'Add Pizza'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

Pizzas.getLayout = (page) => {
    return (<Layout>{page}</Layout>)
}