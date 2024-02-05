import { useState } from "react"


const Blog = ({ blog }) => {
  const [showData, setShowData] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const togglAble = () => {
  setShowData(!showData)
}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={togglAble}>
          {showData ? 'Hide' : 'View'}
        </button>
      </div>
      {showData && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{' '}
            <button onClick={() => console.log('Like button clicked')}>
              Like
            </button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  )
}

export default Blog;