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
        const filtered = data.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase())
        );

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
      <h2>📦 Cached API Data</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "5px", marginBottom: "10px" }}
      />

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {posts.slice(0, 10).map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedAPI;
