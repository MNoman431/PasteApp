import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPaste, updatePaste } from '../redux/pasteSlice';

const ViewPaste = () => {
  const { id } = useParams();  // Get 'id' from URL params
  const pastes = useSelector((state) => state.paste.pastes);  // Get pastes from Redux store
  const paste = pastes.find((x) => x._id === id);  // Find the paste by ID

  const [title, setTitle] = useState(paste ? paste.title : '');  // Default to paste's title if found
  const [content, setContent] = useState(paste ? paste.content : '');  // Default to paste's content if found
  const dispatch = useDispatch();

  // Create or Update the paste
  const createPaste = () => {
    const pasteData = {
      title: title,
      content: content,
      _id: id,  // Use the existing ID from the URL
      createdAt: paste ? paste.createdAt : new Date().toISOString(),
    };

    if (paste) {
      // Update paste if paste already exists
      dispatch(updatePaste(pasteData));
    } else {
      // Create new paste if it does not exist
      dispatch(addPaste(pasteData));
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  // Show loading message or error if paste is not found
  if (!paste) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">
        <p className="text-xl font-semibold">Paste not found!</p>
      </div>
    );  // Display error message if paste does not exist
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
      {/* Container for Paste View */}
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        {/* Title Section */}
        <div className="mb-6">
          <input
            disabled
            type="text"
            value={title}
            placeholder="Enter Title"
            onChange={handleTitleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
          />
        </div>

        {/* Content Section */}
        <div className="mb-8">
          <textarea
            disabled
            placeholder="Enter your content here:"
            value={content}
            onChange={handleContentChange}
            rows={10}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
          />
        </div>

        {/* Action Button (optional for viewing/editing) */}
        {/* You could add buttons here for actions like 'Edit' */}
        <div className="flex justify-between">
          {/* Example button: */}
          {/* <button 
            onClick={createPaste}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Save Changes
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
