import { useEffect } from 'react'

export function useTrapFocus(ref, isOpen) {
    useEffect(() => {
        const element = ref.current
        if (!isOpen || !ref.current) return

        const focusableElements = ref.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstFocusable = focusableElements[0]
        const lastFocusable = focusableElements[focusableElements.length - 1]

        function handleTabKey(e) {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
            lastFocusable.focus()
            e.preventDefault()
            }
        } else {
            if (document.activeElement === lastFocusable) {
            firstFocusable.focus()
            e.preventDefault()
            }
        }
    }

    element.addEventListener('keydown', handleTabKey)
        return () => element?.removeEventListener('keydown', handleTabKey)
    }, [isOpen, ref])
}