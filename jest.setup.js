import '@testing-library/jest-dom'

jest.mock('next/font/google', () => ({
    Inter: () => ({ className: 'mocked-inter' }),
}))