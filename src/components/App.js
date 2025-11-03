import React, { useEffect, useState, useMemo } from "react";
import "regenerator-runtime/runtime";

const CachedAPI = () => {
  const [query, setQuery] = useState(""); // optional input to filter data
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // useMemo caches based on 'query'
  const cachedData = useMemo(() => {
    // When query changes, trigger new fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();

        // Simulate filtering based on query
        

        setPosts(filtered);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); // will only refetch when query changes

  return (
    <div style={{ padding: "20px" }}>
      

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.slice(0, 10).map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <h4>{post.body}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedAPI;
