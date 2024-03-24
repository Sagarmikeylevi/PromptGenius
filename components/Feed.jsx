"use client";
import { useState, useEffect } from "react";
import PromtCard from "./PromptCard";

const PromtCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromtCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    posts.length > 0
      ? posts.filter((post) => {
          const tagMatch = post.tag
            .toLowerCase()
            .includes(searchText.toLowerCase());

          const usernameMatch = post.creator?.username
            .toLowerCase()
            .includes(searchText.toLowerCase());

          return tagMatch || usernameMatch;
        })
      : posts;

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromtCardList data={filteredPosts} />
    </section>
  );
};

export default Feed;
