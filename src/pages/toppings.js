import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '@/components/global/layout'

const initialToppings = [
    {
        id: 1,
        name: 'Pepperoni',
    },
    {
        id: 2,
        name: 'Sausage',
    },
    {
        id: 3,
        name: 'Mushrooms',
    },
    {
        id: 4,
        name: 'Onions',
    },
    {
        id: 5,
        name: 'Green Peppers',
    },
    {
        id: 6,
        name: 'Black Olives',
    },
    {
        id: 7,
        name: 'Pineapple',
    },
    {
        id: 8,
        name: 'Spinach',
    },
]

export default function Toppings() {
    const [toppings, setToppings] = useState(initialToppings)
    const [newTopping, setNewTopping] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editingName, setEditingName] = useState('')
    const editInputRef = useRef(null)

    const addTopping = (e) => {
        e.preventDefault()
        if (newTopping.trim() === '') return
        if (toppings.some((topping) => topping.name.toLowerCase() === newTopping.toLowerCase())) {
            alert('Topping already exists')
            return
        }
        setToppings([...toppings, { id: toppings.length + 1, name: newTopping }])
        setNewTopping('')
    }

    const updateTopping = (id) => {
        if (toppings.some((topping) => topping.name.toLowerCase() === editingName.toLowerCase())) {
            alert('Topping already exists')
            return
        }
        setToppings(toppings.map((topping) => (topping.id === id ? { ...topping, name: editingName } : topping)))
        setEditingId(null)
        setEditingName('');
    }

    const deleteTopping = (id) => {
        setToppings(toppings.filter((topping) => topping.id !== id))
    }

    return (
        <main className='container max-w-4xl py-6'>
            <div className='flex flex-col mt-10 gap-y-6'>
                <h1 className='self-center text-2xl font-semibold'>Manage Toppings</h1>
                <div className=''>
                    <form onSubmit={addTopping} className='flex gap-x-2'>
                        <input
                            type='text'
                            value={newTopping}
                            onChange={(e) => setNewTopping(e.target.value)}
                            placeholder='Add new topping'
                            className='flex-1 p-2 border rounded'
                        />
                        <button type='submit' className='px-4 text-white bg-blue-500 rounded hover:bg-blue-600'>
                            Add Topping
                        </button>
                    </form>
                </div>
                <div className='flex flex-col gap-y-3'>
                    <h2 className='pb-1 text-xl font-medium border-b border-zinc-200'>Available Toppings</h2>
                    <ul className='flex flex-col w-full gap-y-1'>
                        {toppings.map((topping) => (
                            <li key={topping.id} className='flex justify-between py-1 px-1.5 text-lg even:bg-zinc-100'>
                                {editingId === topping.id ? (
                                    <>
                                        <input
                                            type='text'
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            autoFocus
                                        />
                                        <button onClick={() => updateTopping(topping.id)}>Save</button>
                                    </>
                                ) : (
                                    <>
                                        {topping.name}
                                        <div className='flex gap-x-3'>
                                            <button onClick={() => { setEditingId(topping.id); setEditingName(topping.name); }}>Edit</button>
                                            <button onClick={() => deleteTopping(topping.id)}>Delete</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}

Toppings.getLayout = (page) => {
    return (<Layout>{page}</Layout>)
}