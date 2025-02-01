import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export function useToppings() {
    const [toppings, setToppings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchToppings()
    }, [])

    async function fetchToppings() {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('toppings').select('*').order('name', { ascending: true })
            if (error) throw error
            setToppings(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function addTopping(name) {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('toppings').insert([{ name: name.trim() }])
            if (error) throw error
            setToppings([...toppings, ...data])
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateTopping(id, name) {
        setLoading(true)
        try {
            const { error } = await supabase.from('toppings').update({ name: name.trim() }).match({ id })
            if (error) throw error
            setToppings(toppings.map((topping) => (topping.id === id ? { ...topping, name: name.trim() } : topping)))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function deleteTopping(id) {
        setLoading(true)
        try {
            const { error } = await supabase.from('toppings').delete().match({ id })
            if (error) throw error
            setToppings(toppings.filter((topping) => topping.id !== id))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        toppings,
        loading,
        error,
        addTopping,
        updateTopping,
        deleteTopping,
    }
}