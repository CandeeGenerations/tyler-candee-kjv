import React, {useState} from 'react'
import styled from '@emotion/styled'

const lsName = 'tyler-candee-kjv-comment-name'

const NewReply = ({isNew = false, saveComment, referenceComment}) => {
  const [showReply, setShowReply] = useState(false)
  const [newComment, setNewComment] = useState({
    name: localStorage.getItem(lsName),
    comment: '',
  })
  const [loading, setLoading] = useState(false)

  const updateField = (field, value) =>
    setNewComment({...newComment, [field]: value})

  const postComment = () => {
    setLoading(true)

    localStorage.setItem(lsName, newComment.name)

    saveComment({
      name: newComment.name,
      comment: newComment.comment,
      referenceComment,
    })
  }

  return (
    <ReplyButtonContainer>
      {showReply && (
        <NewCommentContainer>
          <strong>Post your comment</strong>

          <input
            type="text"
            placeholder="Your name"
            value={newComment.name}
            onChange={(e) => updateField('name', e.target.value)}
          />

          <textarea
            rows="4"
            placeholder="Your comment"
            value={newComment.comment}
            onChange={(e) => updateField('comment', e.target.value)}
          />
        </NewCommentContainer>
      )}

      <ReplyButton onClick={() => setShowReply(!showReply)}>
        {showReply ? 'Cancel' : isNew ? 'New Comment' : 'Reply'}
      </ReplyButton>

      {showReply && (
        <ReplyButton css={{marginLeft: 10}} onClick={postComment}>
          {loading ? 'Posting...' : 'Post Comment'}
        </ReplyButton>
      )}
    </ReplyButtonContainer>
  )
}

const ReplyButtonContainer = styled.div`
  padding: 0 20px 20px 20px;
`

const ReplyButton = styled.button`
  color: #8f9da7;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 5px 10px;
  margin-top: 10px;
`

const NewCommentContainer = styled.div`
  max-width: 600px;

  > input,
  > textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #d8d8db;
  }
`

export default NewReply
