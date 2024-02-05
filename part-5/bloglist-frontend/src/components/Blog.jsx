import { useState } from "react"
import blogService from "../services/blogs";


const Blog = ({ blog, setBlogs }) => {
  const [showData, setShowData] = useState('')

  const blogStyling = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const togglAble = () => {
  setShowData(!showData)
}

const handleLikes = async (blogs) => {
  const blogToUpdate = { ...blogs, likes: blogs.likes + 1 };
  try {
    const response = await blogService.update(blogToUpdate.id, blogToUpdate);
    setBlogs((prev) => {
      return prev.map((oldblogs) => {
        if (oldblogs.id === response.id) {
          return response;
        }
        return oldblogs;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={blogStyling}>
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
            <button onClick={() => handleLikes(blog)}>Like</button>
          </div>
          <div>{blog.author}</div>
          <div>{blog.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog;