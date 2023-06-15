import useContentList from '../hooks/useContentList'
import ContentCard from './ContentCard'
import Loading from './Loading'

const ContentList = () => {
  const { contentList, isLoading, error } = useContentList()

  if (isLoading) return <Loading />

  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch justify-stretch mx-32 my-9 h-auto">
      {contentList?.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  )
}

export default ContentList
