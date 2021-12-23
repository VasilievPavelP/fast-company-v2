import React from 'react'
import PropTypes from 'prop-types'

import CommentComponent from './commentComponent'
import { sortedComments } from '../../../../utils/sortedComments'

const CommentsCard = ({ comments, deleteComment }) => {
  const sorted = sortedComments(comments)
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {sorted.map((item) => (
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
