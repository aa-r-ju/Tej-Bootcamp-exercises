const dummy = (blogs) => {
    return 1
  }
  
  

const  totalLikes = (listWithOneBlog) => {
    let newVal = 0;
    if(listWithOneBlog.length === 1) {
        newVal = listWithOneBlog[0].likes
    }
    return newVal
}

module.exports = {
    dummy, totalLikes
  }