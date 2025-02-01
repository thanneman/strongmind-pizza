import { useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/global/layout'
import { useToppings } from '@/hooks/useToppings'

export default function Toppings() {
    const { toppings, loading, error, addTopping, updateTopping, deleteTopping } = useToppings()
    const [newTopping, setNewTopping] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editingName, setEditingName] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAddTopping = async (e) => {
        if (newTopping.trim() === '') return
        if (toppings.some((topping) => topping.name.toLowerCase() === newTopping.toLowerCase())) {
            alert('Topping already exists')
            return
        }
        await addTopping(newTopping)
        setNewTopping('')
        setIsDialogOpen(false)
    }

    const handleUpdateTopping = (id) => {
        if (toppings.some((topping) => topping.name.toLowerCase() === editingName.toLowerCase())) {
            alert('Topping already exists')
            return
        }
        // setToppings(toppings.map((topping) => (topping.id === id ? { ...topping, name: editingName } : topping)))
        updateTopping(id, editingName)
        setEditingId(null)
        setEditingName('')
        setIsDialogOpen(false)
    }

    const handleDeleteTopping = (id) => {
        deleteTopping(id)
    }

    const openDialog = (topping = { name: '' }) => {
        setEditingName(topping.name)
        setEditingId(topping.id || null)
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setNewTopping('')
        setEditingName('')
        setEditingId(null)
        setIsDialogOpen(false)
    }

    return (
        <main className='container max-w-4xl py-6'>
            <div className='flex flex-col mt-10 gap-y-6'>
                <h1 className='self-center text-2xl font-semibold'>Manage Toppings</h1>
                <button onClick={() => openDialog()} className='flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg>
                    Create New Topping
                </button>
                <div className='flex flex-col mt-5 gap-y-3'>
                    <h2 className='text-xl font-medium text-center'>Available Toppings</h2>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                        {loading ? (
                            Array(6).fill().map((_, index) => (
                                <div key={index} className='flex flex-col p-4 border rounded shadow-sm animate-pulse'>
                                    <div className='flex items-center justify-between'>
                                        <div className='w-1/2 h-4 bg-gray-100 rounded'></div>
                                        <div className='flex gap-x-2'>
                                            <div className='w-10 h-6 bg-gray-100 rounded'></div>
                                            <div className='w-10 h-6 bg-gray-100 rounded'></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            toppings.map((topping) => (
                                <div key={topping.id} className='flex flex-col p-4 border rounded shadow-sm'>
                                    <div className='flex items-center justify-between'>
                                        <h3 className='text-sm font-semibold md:text-base'>{topping.name}</h3>
                                        <div className='flex gap-x-2'>
                                            <button onClick={() => openDialog(topping)} className='flex justify-center items-center gap-x-0.5 text-sm md:text-base px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-1 2q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"></path></svg>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteTopping(topping.id)} className='flex justify-center items-center gap-x-0.5 text-sm md:text-base px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"></path></svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {error && <p className='text-red-500'>Error: {error}</p>}
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='absolute flex flex-col w-3/4 p-6 max-w-[600px] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md md:w-1/2 top-1/2 left-1/2'>
                        <div className='flex items-start justify-between'>
                            <h2 className='mb-4 text-xl font-semibold'>{editingId ? 'Edit Topping' : 'Add Topping'}</h2>
                            <button onClick={closeDialog} className='text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" className='-mt-2'><path fill="currentColor" d="m12 13.4l-2.917 2.925q-.277.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.831 7.4 8.404t.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.277-.275.704-.275t.704.275q.3.3.3.713t-.3.687L13.375 12l2.925 2.917q.275.277.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"></path></svg>
                            </button>
                        </div>
                        <div>
                            <form onSubmit={(e) => { e.preventDefault(); editingId ? handleUpdateTopping(editingId) : handleAddTopping(); }} className='flex flex-col mt-4 gap-y-4'>
                                <input
                                    type='text'
                                    value={editingId ? editingName : newTopping}
                                    onChange={(e) => editingId ? setEditingName(e.target.value) : setNewTopping(e.target.value)}
                                    placeholder='Topping name'
                                    className='p-2 border rounded'
                                />
                                <button type='submit' className='py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                                    {editingId ? 'Update Topping' : 'Add Topping'}
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