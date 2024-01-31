import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    let loggedinUser = await loginServices.login({
      username,
      password
    })
    setUser(loggedinUser)
  }

  const loginForm = () => {
    return(
      <div>
        <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          </div>
          <button type="submit">login</button>
        </form>
  </div>
    )
  }
  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </div>
    )
  }
  return (
    <div>
      {user === null ? loginForm() : blogForm()}


    </div>
  )
  

}

export default App;
