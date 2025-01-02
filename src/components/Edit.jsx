import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaste } from '../redux/pasteSlice';

const Edit = () => {
    const { id } = useParams();  // Get 'id' from the URL params
    const paste = useSelector((state) => state.paste.pastes);  // Get pastes from Redux store
    const filter = paste.find((x) => x._id === id);  // Find the paste by ID

    // If no paste is found for the given id, handle that case
    if (!filter) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">
                <p className="text-xl font-semibold">Paste not found!</p>
            </div>
        );
    }

    const [title, setTitle] = useState(filter.title || '');  // Set title from filter, default is empty string
    const [content, setContent] = useState(filter.content || '');  // Set content from filter, default is empty string

    const [searchParams, setSearchParams] = useSearchParams();  // Get search params
    const pasteId = searchParams.get("pasteId");  // Extract pasteId from query params

    const dispatch = useDispatch();  // Initialize the Redux dispatch

    // Handle the update action
    const handleUpdate = () => {
        dispatch(updatePaste({ 
            _id: id, 
            title, 
            content 
        }));
        // Optionally show success or redirect
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                {/* Title Input Section */}
                <div className="mb-6">
                    <label htmlFor="title" className="text-lg font-semibold text-gray-700">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}  // Update title on change
                        placeholder="Enter Title"
                        className="w-full mt-2 px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
                    />
                </div>

                {/* Content Section */}
                <div className="mb-6">
                    <label htmlFor="content" className="text-lg font-semibold text-gray-700">Content</label>
                    <textarea
                        id="content"
                        placeholder="Enter your content here:"
                        value={content}  // Bind textarea value to content state
                        onChange={(e) => setContent(e.target.value)}  // Handle content change
                        rows={10}
                        className="w-full mt-2 px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
                    />
                </div>

                {/* Update Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleUpdate}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Update Paste
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
