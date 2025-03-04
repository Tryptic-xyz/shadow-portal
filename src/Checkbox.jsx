const Checkbox = ({ checked, onChange }) => {
  return (
    <div
      checked={checked}
      onClick={onChange}
      className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
          ${
            checked
              ? "bg-blue-500 border-white shadow-md"
              : "bg-white/20 border-gray-400"
          }
        `}
    >
      <span className={checked ? "" : "hidden" }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M12.3333 1L4.99996 8.33333L1.66663 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default Checkbox;
