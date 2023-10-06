import { useEffect, useState } from 'react'
import { ContentBody, ContentDto } from '../types/types'

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDto | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`https://api.learnhub.thanayut.in.th/content/${id}`)
        const data = await res.json()

        setContent(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const editContent = async (updateBody: Omit<ContentBody, 'videoUrl'>) => {
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`https://api.learnhub.thanayut.in.th/content/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateBody),
      })
      const data = await res.json()

      if (data.statusCode >= 400) {
        throw new Error(data.message)
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { content, isLoading, error, editContent }
}

export default useContent
