import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPaste, updatePaste } from '../redux/pasteSlice';

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  // Create or update paste
  function createPaste() {
    const paste = {
      title: title,
      content: content,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update paste
      dispatch(updatePaste(paste));
    } else {
      // Create paste
      dispatch(addPaste(paste));
    }

    // Reset form after submission
    setTitle("");
    setContent("");
    setSearchParams({});
  }

  // Handle title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle content textarea change
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        {pasteId ? "Update Your Paste" : "Create a New Paste"}
      </h1>

      {/* Title Input Field */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          placeholder="Enter Title"
          onChange={handleTitleChange}
          className="w-full p-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
        />
      </div>

      {/* Content Textarea */}
      <div className="mb-6">
        <textarea
          placeholder="Enter your content here..."
          value={content}
          onChange={handleContentChange}
          rows={8}
          className="w-full p-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={createPaste}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
    </div>
  );
}

export default Home;

