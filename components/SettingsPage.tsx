
import React from 'react';
import { BackIcon } from './icons/NavigationIcons';

interface SettingsPageProps {
  onBack: () => void;
}

const SliderControl: React.FC<{ label: string; min: number; max: number; value: number }> = ({ label, min, max, value }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
            <label className="text-gray-300">{label}</label>
            <span className="text-sm font-mono text-[#FF8A00]">{value}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            defaultValue={value}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#0FA3A3]"
        />
    </div>
);

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  return (
    <div className="w-full h-full bg-[#0D0D0D] p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 text-white">
          <BackIcon />
        </button>
        <h1 className="text-xl font-bold text-[#0FA3A3]">Image Settings</h1>
        <div className="w-8"></div>
      </div>
      
      <div className="flex-grow overflow-y-auto px-2">
        <SliderControl label="Noise Reduction" min={0} max={100} value={75} />
        <SliderControl label="Sharpness" min={0} max={100} value={60} />
        <SliderControl label="Contrast" min={-50} max={50} value={10} />
        <SliderControl label="Highlights" min={-100} max={100} value={-20} />
        <SliderControl label="Shadows" min={-100} max={100} value={15} />
        <SliderControl label="Saturation" min={0} max={100} value={55} />
        <SliderControl label="Vibrance" min={0} max={100} value={65} />
      </div>

      <div className="mt-4 border-t border-gray-800 pt-4">
        <p className="text-xs text-gray-500 text-center">
            HybridCam uses original imaging algorithms inspired by computational photography research. No proprietary or trademarked code is included.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
