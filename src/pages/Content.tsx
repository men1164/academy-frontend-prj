import { useParams } from 'react-router-dom'
import useContent from '../hooks/useContent'
import Loading from '../components/Loading'
import ReactPlayer from 'react-player'
import ReactStars from 'react-stars'

const Content = () => {
  const { id } = useParams()
  const { content, isLoading, error } = useContent(id || '1')

  if (isLoading) return <Loading />

  if (error || !content) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center mx-auto my-20 w-max bg-gray-100 shadow-lg p-8 rounded-xl">
      <p className="text-3xl font-bold text-orange-500">{content.videoTitle}</p>
      <p className="text-xl text-gray-600">{content.creatorName}</p>
      <ReactPlayer url={content.videoUrl} />
      <p className="text-xl text-gray-600">{content.comment}</p>
      <p className="text-xl text-gray-600">by {content.postedBy.name}</p>
      <ReactStars count={5} value={content.rating} size={24} color2={'#ffd700'} edit={false} />
    </div>
  )
}

export default Content
