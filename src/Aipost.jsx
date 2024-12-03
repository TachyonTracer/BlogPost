import React, { useEffect, useState } from "react";
import { getPostFromMistral } from "./Postfetch";

export default function Aipost({ topic, error }) {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (topic && topic.length > 0) {
        setLoading(true);
        try {
          const fetchedPost = await getPostFromMistral(topic);
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            setPost("Sorry, no Post found for the given topic.");
          }
        } catch (err) {
          console.error("Error fetching post:", err);
          setPost("Sorry, something went wrong while fetching the post.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [topic]);

  const handleFormSubmit = () => {
    if (title.trim() && description.trim()) {
      alert("Post Submitted!");
      setTitle("");
      setDescription("");
    } else {
      alert("Please fill in both the title and description.");
    }
  };

  // Conditional rendering based on the state
  if (loading) {
    return <p>Loading your post...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="mt-20">
    
      {/* Post creation form */}
      <div >
        <div className="heading text-center font-bold text-4xl m-5 mt-7 text-gray-800">
          Ai Generated Post
        </div>
        <div
          className="editor mx-auto w-10/12 flex flex-col mt-7 text-gray-800 border border-gray-300 p-7 shadow-lg max-w-2xl"
          style={{ background: "white" }}
        >
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Describe everything about this post here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Icons */}
          <div className="icons flex text-gray-500 m-2">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              {description.length}/300
            </div>
          </div>

          {/* Buttons */}
          <div className="buttons flex">
            <div
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
              onClick={() => {
                setTitle("");
                setDescription("");
              }}
            >
              Cancel
            </div>
            <div
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
              onClick={handleFormSubmit}
            >
              Post
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
