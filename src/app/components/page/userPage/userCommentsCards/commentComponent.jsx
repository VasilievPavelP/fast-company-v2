import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import api from '../../../../api'
import { displayDate } from '../../../../utils/displayDate'

const CommentComponent = ({ userId, content, createdAt, deleteComment, id }) => {
  const [userName, setUserName] = useState()
  const [createDate, setCreateDate] = useState()
  const now = Date.now()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUserName(data.name))
  }, [])

  useEffect(() => {
    setCreateDate(displayDate(createdAt))
  }, [now])

  return (
    <div className='bg-light card-body mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start'>
            {userName ? (
              <>
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${userId}.svg`}
                  className='rounded-circle shadow-1-strong me-3'
                  alt='avatar'
                  width='65'
                  height='65'
                />
                <div className='flex-grow-1 flex-shrink-1'>
                  <div className='mb-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <p className='mb-1'>
                        {userName}
                        <span className='small'> {createDate && createDate}</span>
                      </p>
                      <button
                        className='btn btn-sm text-primary d-flex align-items-center'
                        onClick={() => deleteComment(id)}
                      >
                        <i className='bi bi-x-lg'></i>
                      </button>
                    </div>
                    <p className='small mb-0'>{content}</p>
                  </div>
                </div>
              </>
            ) : (
              <h3>Loading...</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

CommentComponent.propTypes = {
  userId: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  createdAt: PropTypes.number,
  deleteComment: PropTypes.func,
}

export default CommentComponent
