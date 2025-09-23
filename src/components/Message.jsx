export default function Message({ element, index, socketid }) {
  return (
    <div
      className={`rounded-lg px-4 py-2 max-w-[70%] ${
        element[1] === socketid
          ? "bg-blue-600 self-end text-white"
          : "bg-[#40444b] self-start text-gray-200"
      }`}
    >
      <div className="text-xs text-gray-400 mb-1">
        {element[1] === socketid ? "Me" : element[1]}
      </div>
      <div className="text-base">{element[0]}</div>
    </div>
  );
}
