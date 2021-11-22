import React from 'react'
import PropTypes from 'prop-types'

import CommentComponent from './commentComponent'

const CommentsCard = ({ comments, deleteComment }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h2>Comments</h2>
        <hr />
        {comments.map((item) => (
          <CommentComponent
            key={item._id}
            userId={item.userId}
            content={item.content}
            createdAt={item.created_at}
            id={item._id}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  )
}

CommentsCard.propTypes = {
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

export default CommentsCard
