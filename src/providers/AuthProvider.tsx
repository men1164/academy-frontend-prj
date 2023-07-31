import React, { createContext, useContext, useState } from 'react'

interface IAuthContext {
  isLoggedIn: boolean
  username: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<IAuthContext | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used inside AuthProvider!')

  return context
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token)
  const [username, setUsername] = useState<string | null>(user)

  const login = async (username: string, password: string) => {
    const loginInfo = { username, password }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      })
      const data = await res.json()

      if (data.statusCode === 401) {
        throw new Error(data.message)
      }

      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', username)
      setIsLoggedIn(true)
      setUsername(username)
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const register = async (username: string, password: string, name: string) => {
    const registerBody = { username, name, password }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerBody),
      })
      const data = await res.json()

      if (data.statusCode && data.statusCode !== 201) {
        throw new Error(data.message)
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register, username }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
