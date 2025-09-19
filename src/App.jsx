import React from "react";

function App() {
  return (
    <div className="flex justify-center items-center h-screen min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md h-1/2 min-w-[350px]">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-base"
          />
          <button className="px-5 py-2 bg-blue-700 text-white rounded font-bold cursor-pointer hover:bg-blue-900">
            SEND
          </button>
        </div>
        <div>
          <div className="font-bold mb-2">Received Messages</div>
          <div className="h-80 bg-gray-200 rounded p-2"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
