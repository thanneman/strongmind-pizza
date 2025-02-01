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

export default function Toppings() {
    const [toppings, setToppings] = useState(initialToppings)
    const [newTopping, setNewTopping] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editingName, setEditingName] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const addTopping = (e) => {
        if (newTopping.trim() === '') return
        if (toppings.some((topping) => topping.name.toLowerCase() === newTopping.toLowerCase())) {
            alert('Topping already exists')
            return
        }
        setToppings([...toppings, { id: toppings.length + 1, name: newTopping }])
        setNewTopping('')
        setIsDialogOpen(false)
    }

    const updateTopping = (id) => {
        if (toppings.some((topping) => topping.name.toLowerCase() === editingName.toLowerCase())) {
            alert('Topping already exists')
            return
        }
        setToppings(toppings.map((topping) => (topping.id === id ? { ...topping, name: editingName } : topping)))
        setEditingId(null)
        setEditingName('')
        setIsDialogOpen(false)
    }

    const deleteTopping = (id) => {
        setToppings(toppings.filter((topping) => topping.id !== id))
    }

    const openDialog = (topping = { name: '' }) => {
        setNewTopping(topping.name)
        setEditingId(topping.id || null)
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setNewTopping('')
        setEditingId(null)
        setIsDialogOpen(false)
    }

    return (
        <main className='container max-w-4xl py-6'>
            <div className='flex flex-col mt-10 gap-y-6'>
                <h1 className='self-center text-2xl font-semibold'>Manage Toppings</h1>
                <button onClick={() => openDialog()} className='flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg>
                    Add New Topping
                </button>
                <div className='flex flex-col mt-5 gap-y-3'>
                    <h2 className='text-xl font-medium text-center'>Available Toppings</h2>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        {toppings.map((topping) => (
                            <div key={topping.id} className='flex flex-col p-4 border rounded shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-semibold text-md'>{topping.name}</h3>
                                    <div className='flex gap-x-2'>
                                        <button onClick={() => openDialog(topping)} className='px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600'>
                                            Edit
                                        </button>
                                        <button onClick={() => deleteTopping(topping.id)} className='px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='absolute flex flex-col w-1/2 p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md top-1/2 left-1/2'>
                        <div className='flex items-start justify-between'>
                            <h2 className='mb-4 text-xl font-semibold'>{editingId ? 'Edit Topping' : 'Add Topping'}</h2>
                            <button onClick={closeDialog} className='text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" className='-mt-2'><path fill="currentColor" d="m12 13.4l-2.917 2.925q-.277.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.831 7.4 8.404t.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.277-.275.704-.275t.704.275q.3.3.3.713t-.3.687L13.375 12l2.925 2.917q.275.277.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"></path></svg>
                            </button>
                        </div>
                        <div>
                            <form onSubmit={(e) => { e.preventDefault(); editingId ? updateTopping(editingId) : addTopping(); }} className='flex flex-col mt-4 gap-y-4'>
                                <input
                                    type='text'
                                    value={newTopping}
                                    onChange={(e) => setNewTopping(e.target.value)}
                                    placeholder='Topping name'
                                    className='p-2 border rounded'
                                />
                                <button type='submit' className='py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                                    {editingId ? 'Save' : 'Add'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

Toppings.getLayout = (page) => {
    return (<Layout>{page}</Layout>)
}