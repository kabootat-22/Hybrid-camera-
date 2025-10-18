
import React, { useState } from 'react';
import { CameraMode } from '../types';
import { MODES } from '../constants';

const ModePicker: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CameraMode>(CameraMode.PHOTO);

  return (
    <div className="overflow-x-auto whitespace-nowrap text-center no-scrollbar pb-2">
      {MODES.map((mode) => (
        <button
          key={mode}
          onClick={() => setActiveMode(mode)}
          className={`inline-block mx-4 text-sm font-semibold transition-all duration-300 ${
            activeMode === mode ? 'text-[#FF8A00] scale-110' : 'text-white opacity-70'
          }`}
        >
          {mode.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default ModePicker;
