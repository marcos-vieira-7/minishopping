"use client";


export default function Toast({ message, type, visible  }: any) {
  
  if (!message) return null;

  const colors: any = {
    success: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div
      className={`fixed top-20 right-5 z-50
       text-white px-4 py-2 rounded shadow
         transition-all duration-300 ease-in-out
        ${colors[type]}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}>
      {message}
    </div>
  );
}