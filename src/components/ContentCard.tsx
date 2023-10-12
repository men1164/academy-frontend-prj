import { Link } from 'react-router-dom'
import { ContentDTO } from '../types/dto'
import ReactStars from 'react-stars'

interface ContentCardProps {
  content: ContentDTO
}

const ContentCard = ({ content }: ContentCardProps) => {
  return (
    <Link to={`/content/${content.id}`} className="flex flex-col bg-gray-100 rounded-xl shadow-lg overflow-hidden">
      <img src={content.thumbnailUrl} className="w-full aspect-video object-cover" />
      <div className="flex flex-col gap-4 p-4 justify-between h-full">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-md text-gray-500">{content.videoTitle}</p>
          <p className="text-gray-500">{content.creatorName}</p>
          <p className="text-gray-500 italic">{content.comment}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-md text-gray-500">{content.postedBy.name}</p>
          <ReactStars value={content.rating} edit={false} />
        </div>
      </div>
    </Link>
  )
}

export default ContentCard
