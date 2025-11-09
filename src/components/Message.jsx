export default function Message({ element, index, username }) {
  const isMe = element[1] === username;

  return (
    <div
      className={`flex flex-col ${
        isMe ? "items-end" : "items-start"
      } group relative`}
    >
      <div
        className={`rounded-lg px-4 py-2 max-w-[70%] shadow-sm 
          ${
            isMe
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
              : "bg-[#4f545c] text-gray-200"
          }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-300 font-medium">
            {isMe ? "Me" : element[1]}
          </span>
          <span className="text-[10px] text-gray-400 ml-2 opacity-0 group-hover:opacity-100">
            {/* Optional: timestamp */}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="text-base">{element[0]}</div>
      </div>
    </div>
  );
}
