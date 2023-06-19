import { useEffect, useState } from 'react'
import { ContentDto } from '../types/types'

const useContentList = () => {
  const [contentList, setContentList] = useState<ContentDto[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('https://api.learnhub.thanayut.in.th/content')
        const data = await res.json()

        setContentList(data.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const createContent = async (contentBody: { videoUrl: string; comment: string; rating: number }) => {
    const token = localStorage.getItem('token')

    try {
      await fetch('https://api.learnhub.thanayut.in.th/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contentBody),
      })
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { contentList, isLoading, error, createContent }
}

export default useContentList
