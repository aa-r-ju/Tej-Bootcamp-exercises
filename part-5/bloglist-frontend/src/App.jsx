import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./main.css";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogsForm";
import LoginForm from "./components/LoginsForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [newBlogTitle, setnewBlogTitle] = useState("");
  const [newBlogAuthor, setnewBlogAuthor] = useState("");
  const [newBlogUrl, setnewBlogUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    let my_user = window.localStorage.getItem("user");
    if (my_user) {
      setUser(JSON.parse(my_user));
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      let user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setNotification({ message: `${user.username} logged in` });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      setErrormessage("wrong username or password");
      setTimeout(() => {
        setErrormessage(null);
      }, 1000);
    }
  };

  const handleAddNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    const createdBlog = await blogService.create(newBlog);
    setBlogs([...blogs, createdBlog]);
    setnewBlogTitle("");
    setnewBlogAuthor("");
    setnewBlogUrl("");
    setNotification({
      message: `A new blog ${createdBlog.title}! by ${createdBlog.author} added successfully.`,
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && <Notification message={notification.message} />}
        {errormessage && (
          <Notification type="errormessage" message={errormessage} />
        )}

        <Togglable buttonLabel="Login">
          <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    );
  };
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setNotification({ message: `${user.username} logged out` });
    setUser(null);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

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


  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notification ? notification.message : null} />
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <br />
        <Togglable buttonLabel="new note">
          <BlogForm
            handleAddNewBlog={handleAddNewBlog}
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            setnewBlogTitle={setnewBlogTitle}
            setnewBlogAuthor={setnewBlogAuthor}
            setnewBlogUrl={setnewBlogUrl}
          />
        </Togglable>
        <br />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              loggedinUser={user}
              handleLikes={handleLikes}
            />
          ))}
      </div>
    );
  };
  return <div>{user === null ? loginForm() : blogForm()}</div>;
};
export default App;
