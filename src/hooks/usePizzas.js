import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export function usePizzas() {
    const supabase = createClient()
    const [pizzas, setPizzas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchPizzas()
    }, [])

    async function fetchPizzas() {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('pizzas').select('*').order('name', { ascending: true })
            if (error) throw error
            setPizzas(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function addPizza(name, toppings) {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('pizzas').insert([{ name: name.trim(), toppings }]).select()
            if (error) throw error
            setPizzas([...pizzas, ...data])
            return data[0]
        } catch (error) {
            setError(error.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    async function updatePizza(id, name, toppings) {
        setLoading(true)
        try {
            const { error } = await supabase.from('pizzas').update({ name: name.trim(), toppings }).match({ id })
            if (error) throw error
            setPizzas(pizzas.map((pizza) => (pizza.id === id ? { ...pizza, name: name.trim(), toppings } : pizza)))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function deletePizza(id) {
        setLoading(true)
        try {
            const { error } = await supabase.from('pizzas').delete().match({ id })
            if (error) throw error
            setPizzas(pizzas.filter((pizza) => pizza.id !== id))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        pizzas,
        loading,
        error,
        addPizza,
        updatePizza,
        deletePizza
    }
}