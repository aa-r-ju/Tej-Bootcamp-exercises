import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, loggedinUser, handleLikes }) => {
  const dispatch = useDispatch();
  const [blogToShow, setBlogToShow] = useState([]);

  const blogStyling = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  blogStyling.removebutton = {
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
    border: "solid",
  };

  const handleDelete = async (blog) => {
    const confirmation = window.confirm(
      "Do you really want to remove this blog?"
    );
    if (confirmation) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs((blogs) => blogs.filter((item) => item.id !== blog.id));
        dispatch(setNotification("Blog deleted successfully!", 3));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  if (blogToShow.includes(blog.id)) {
    return (
      <div style={blogStyling} className="blog-div">
        {blog.title}
        <button
          onClick={() =>
            setBlogToShow(blogToShow.filter((id) => id !== blog.id))
          }
        >
          hide
        </button>
        <br />
        url: {blog.url}
        <br />
        Likes: {blog.likes}{" "}
        <button onClick={() => handleLikes(blog)} id="likes" className="likes">
          Like
        </button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <div>
          {loggedinUser.username === blog.user.username ||
          loggedinUser.id === blog.user ? (
            <button
              onClick={() => handleDelete(blog)}
              style={blogStyling.removebutton}
              id="remove"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    );
  }
  return (
    <div style={blogStyling} className="blog-div">
      {blog.title} {blog.author}{" "}
      <button
        onClick={() => setBlogToShow([...blogToShow, blog.id])}
        className="view"
      >
        view
      </button>
    </div>
  );
};

export default Blog;
