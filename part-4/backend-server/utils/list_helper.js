const dummy = (blogs) => {
    return 1
  }
  

  const totalLikes = (listWithOneBlog) => {
    let newVal = 0;
    if(listWithOneBlog.length === 1) {
        newVal = listWithOneBlog[0].likes
    }
    return newVal
  }

  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    let favorite = blogs[0];
  
    for (let i = 1; i < blogs.length; i++) {
      if (blogs[i].likes > favorite.likes) {
        favorite = blogs[i]; 
      }
    }
  
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    };
  };
  


  const mostBlogs = (blogs) => {
    const blogsByAuthor = {};
    blogs.forEach(blog => {
        if (!blogsByAuthor[blog.author]) {
            blogsByAuthor[blog.author] = [];
        }
        blogsByAuthor[blog.author].push(blog);
    });

    let maxBlogs = 0;
    let topAuthor = '';
    for (let author in blogsByAuthor) {
        if (blogsByAuthor[author].length > maxBlogs) {
            maxBlogs = blogsByAuthor[author].length;
            topAuthor = author;
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs
    };
}

  

  module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs
  }
  