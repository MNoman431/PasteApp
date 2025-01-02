
// chatgpt
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePaste } from "../redux/pasteSlice";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) => {
    const title = paste.title;
    return title && typeof title === 'string' && title.toLowerCase().includes(searchTerm?.toLowerCase() || '');
  });

  function handleDelete(pasteId) {
    dispatch(removePaste(pasteId));
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Your Pastes</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="Search for your pastes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-1/2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Paste List */}
      <div className="space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h2 className="text-xl font-semibold mb-2">{paste.title}</h2>
              <p className="text-gray-700 mb-4">{paste.content}</p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{new Date(paste.createdAt).toLocaleString()}</span>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/edit/${paste._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <a
                    href={`/paste/${paste._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      navigator.share({
                        title: "Share this content",
                        text: paste.content
                      });
                      toast.success("Sharing...");
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No pastes found.</p>
        )}
      </div>
    </div>
  );
}

export default Paste;

// mera code:
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removePaste } from "../redux/pasteSlice";
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// function Paste() {
//   const pastes = useSelector((state) => state.paste.pastes);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const filteredData = pastes.filter((paste) => {
//     const title = paste.title;
//     return title && typeof title === 'string' && title.toLowerCase().includes(searchTerm?.toLowerCase() || '');
//   });

//   function handleDelete(pasteId) {
//     dispatch(removePaste(pasteId));
//   }

//   return (
//     <>
//       <input
//         type="search"
//         placeholder="Enter text here"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div>
//         {filteredData.length > 0 &&
//           filteredData.map((paste) => {
//             return (
//               <div className='border'>
//                 <div>{paste.title}</div>
//                 <div>{paste.content}</div>

//                 <div className='flex flex-row gap-4 place-content-evenly '>
//                   <button onClick={() => navigate(`/edit/${paste._id}`)} className='border'>
//                     Edit
//                   </button>

//                   <button className='border'>
//                     {/* Update this to link directly to the paste detail page */}
//                     <a href={`/paste/${paste._id}`}>view</a>
//                   </button>

//                   <button onClick={() => handleDelete(paste?._id)} className='border'>
//                     Delete
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(paste?.content);
//                       toast.success("copied to clipboard");
//                     }}
//                     className='border'
//                   >
//                     copy
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigator.share({
//                         title: "share this content",
//                         text: paste?.content
//                       });
//                       toast.success("share your data now");
//                     }}
//                     className="border py-1 px-3 rounded-lg bg-red-100"
//                   >
//                     Share
//                   </button>
//                 </div>

//                 <div>{paste.createdAt}</div>
//               </div>
//             );
//           })
//         }
//       </div>
//     </>
//   );
// }

// export default Paste;



