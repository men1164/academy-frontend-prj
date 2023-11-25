import axios, { AxiosError } from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { API_HOST } from '../const'
import { CredentialDTO, LoginDTO, RegisterDTO } from '../types/dto'

interface IAuthContext {
  isLoggedIn: boolean
  username: string | null
  login: (loginBody: LoginDTO) => Promise<void>
  register: (registerBody: RegisterDTO) => Promise<void>
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

  const login = async (loginBody: LoginDTO) => {
    try {
      const res = await axios.post<CredentialDTO>(`${API_HOST}/auth/login`, loginBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('user', loginBody.username)
      setIsLoggedIn(true)
      setUsername(username)
    } catch (err) {
      if (err instanceof AxiosError) throw new Error(err.response?.data.message)
    }
  }

  const register = async (registerBody: RegisterDTO) => {
    try {
      await axios.post(`${API_HOST}/user`, registerBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (err) {
      if (err instanceof AxiosError) throw new Error(err.response?.data.message)
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
