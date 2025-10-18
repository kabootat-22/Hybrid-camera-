
import React from 'react';

interface ShutterButtonProps {
  onClick: () => void;
}

const ShutterButton: React.FC<ShutterButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 active:scale-90"
      aria-label="Capture photo"
    >
      <div className="w-[72px] h-[72px] rounded-full bg-white"></div>
    </button>
  );
};

export default ShutterButton;
