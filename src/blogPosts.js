import React, { useState, useEffect } from 'react'

const BlogPosts = () => {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);
  // State to store any error that occurs during the fetch
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          // If not, throw an error
          throw new Error('Network response was not ok');
        }
        // Parse the JSON data from the response
        return response.json();
      })
      .then(data => {
        // If successful, update the posts state with the fetched data
        setPosts(data);
      })
      .catch(error => {
        // If an error occurs, update the error state with the error message
        setError(error.message);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // If there's an error, display it to the user
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no error, display the list of posts
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
