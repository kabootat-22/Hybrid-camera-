
import React, { useState } from 'react';
import { CameraConfig } from '../types';
import { BackIcon } from './icons/NavigationIcons';

interface ProfileManagerProps {
  config: CameraConfig;
  setConfig: (config: CameraConfig) => void;
  onBack: () => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ config, setConfig, onBack }) => {
  const [jsonString, setJsonString] = useState(JSON.stringify(config, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    try {
      const newConfig = JSON.parse(jsonString);
      setConfig(newConfig);
      setError(null);
      alert('Profile applied successfully!');
    } catch (e) {
      setError('Invalid JSON format. Please check your syntax.');
    }
  };

  return (
    <div className="w-full h-full bg-[#0D0D0D] p-4 flex flex-col">
       <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-2 text-white">
          <BackIcon />
        </button>
        <h1 className="text-xl font-bold text-[#0FA3A3]">Profile Manager</h1>
        <div className="w-8"></div>
      </div>
      <p className="text-gray-400 mb-2 text-sm">Edit the JSON configuration below. Press 'Apply' to save changes.</p>
      {error && <p className="text-red-500 bg-red-900/50 p-2 rounded mb-2 text-sm">{error}</p>}
      <textarea
        value={jsonString}
        onChange={(e) => setJsonString(e.target.value)}
        className="w-full flex-grow bg-black/50 border border-gray-700 rounded-md p-2 font-mono text-sm text-white resize-none"
      />
      <div className="mt-4 flex gap-4">
        <button onClick={handleApply} className="flex-1 bg-[#0FA3A3] text-white font-bold py-3 rounded-lg hover:bg-teal-500 transition-colors">
          Apply Profile
        </button>
        <button onClick={() => navigator.clipboard.writeText(jsonString)} className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-colors">
          Copy JSON
        </button>
      </div>
    </div>
  );
};

export default ProfileManager;
