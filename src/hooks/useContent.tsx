import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { API_HOST } from '../const'
import { ContentDTO, UpdateContentDTO } from '../types/dto'

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDTO | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get<ContentDTO>(`${API_HOST}/content/${id}`)

        setContent(res.data)
      } catch (err) {
        if (err instanceof AxiosError) setError(err.response?.data.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const editContent = async (updateBody: UpdateContentDTO) => {
    const token = localStorage.getItem('token')

    try {
      await axios.patch(`${API_HOST}/content/${id}`, updateBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      if (err instanceof AxiosError) throw new Error(err.response?.data.message)
    }
  }

  const deleteContent = async () => {
    const token = localStorage.getItem('token')

    try {
      await axios.delete(`${API_HOST}/content/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      if (err instanceof AxiosError) throw new Error(err.response?.data.message)
    }
  }

  return { content, isLoading, error, editContent, deleteContent }
}

export default useContent
