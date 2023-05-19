const ExportIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5l-.354-.354.354-.354.354.354L12 5zm.5 9a.5.5 0 1 1-1 0h1zM6.646 9.646l5-5 .707.707-5 5-.707-.707zm5.707-5l5 5-.707.707-5-5 .707-.707zM12.5 5v9h-1V5h1z"
        fill="#000"
      />
      <path d="M5 16v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" stroke="#000" />
    </svg>
  );
};

export default ExportIcon;
