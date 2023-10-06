import { useEffect, useState } from 'react'
import { CreateContentDTO, ContentsDTO } from '../types/dto'
import axios, { AxiosError } from 'axios'

const useContentList = () => {
  const [contentList, setContentList] = useState<ContentsDTO | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get<ContentsDTO>('https://api.learnhub.thanayut.in.th/content')

        setContentList(res.data)
      } catch (err) {
        if (err instanceof AxiosError) setError(err.response?.data.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const createContent = async (contentBody: CreateContentDTO) => {
    const token = localStorage.getItem('token')

    try {
      await axios.post('https://api.learnhub.thanayut.in.th/content', contentBody, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
    } catch (err) {
      if (err instanceof AxiosError) throw new Error(err.response?.data.message)
    }
  }

  return { contentList, isLoading, error, createContent }
}

export default useContentList
