import { useNavigate, useParams } from 'react-router-dom'
import useContent from '../hooks/useContent'
import Loading from '../components/Loading'
import ReactPlayer from 'react-player'
import ReactStars from 'react-stars'
import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from 'antd'
import toast from 'react-hot-toast'

const Content = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { username } = useAuth()
  const { content, isLoading, error, deleteContent } = useContent(id || '1')
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('You cannot undo this action.')

  const handleDelete = async () => {
    setModalText('Deleting...')
    setConfirmLoading(true)
    try {
      await deleteContent()

      toast.success('Delete Successful')
      navigate('/')
    } catch (err) {
      if (err instanceof Error) toast.error(err.message)
    } finally {
      setOpen(false)
      setConfirmLoading(false)
    }
  }

  if (isLoading || !content) return <Loading />

  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 text-center mx-auto my-20 max-w-3xl bg-gray-100 shadow-lg p-8 rounded-xl">
        <p className="text-3xl font-bold text-orange-500">{content.videoTitle}</p>
        <p className="text-xl text-gray-600">{content.creatorName}</p>
        <ReactPlayer url={content.videoUrl} />
        <p className="text-xl text-gray-600">{content.comment}</p>
        <p className="text-xl text-gray-600">by {content.postedBy.name}</p>
        <ReactStars count={5} value={content.rating} size={24} color2={'#ffd700'} edit={false} />
        {username === content.postedBy.username && (
          <div className="flex gap-12">
            <Link to={`/edit/${id}`} className="font-semibold text-lg text-orange-500">
              Edit
            </Link>
            <button onClick={() => setOpen(true)} className="font-semibold text-lg text-red-500">
              Delete
            </button>
          </div>
        )}
      </div>
      <Modal
        title="Do you want to delete this content?"
        open={open}
        onOk={handleDelete}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default Content
