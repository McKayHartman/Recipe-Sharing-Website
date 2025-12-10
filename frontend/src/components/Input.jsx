export default function Input({ height, tall = false, className = "", ...props }) {
  if (tall) {
    // Use textarea for tall input
    return (
      <textarea
        {...props}
        style={height ? { height } : undefined}
        className={
          `w-full px-3 py-2 border border-gray-300 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           resize-none ${className}`
        }
      />
    );
  }

  // Regular single-line input
  return (
    <input
      {...props}
      style={height ? { height } : undefined}
      className={
        `w-full px-3 py-2 border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         ${className}`
      }
    />
  );
}
