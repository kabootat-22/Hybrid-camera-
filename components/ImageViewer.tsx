
import React, { useState, useEffect } from 'react';
import { BackIcon, MagicIcon, DownloadIcon } from './icons/NavigationIcons';
import { editImageWithGemini } from '../services/geminiService';

interface ImageViewerProps {
  originalImage: string;
  editedImage: string | null;
  setEditedImage: (image: string | null) => void;
  onBack: () => void;
}

// Mock window.aistudio for environments where it's not present.
if (typeof window !== 'undefined' && !(window as any).aistudio) {
  (window as any).aistudio = {
    hasSelectedApiKey: () => Promise.resolve(true),
    openSelectKey: () => Promise.resolve(),
  };
}

const ImageViewer: React.FC<ImageViewerProps> = ({ originalImage, editedImage, setEditedImage, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeySelected, setApiKeySelected] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setApiKeySelected(hasKey);
    };
    checkApiKey();
  }, []);

  const handleSelectApiKey = async () => {
      await (window as any).aistudio.openSelectKey();
      // Assume success to avoid race conditions. If API call fails, user will be prompted again.
      setApiKeySelected(true);
      setError(null);
  };

  const handleMagicEdit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }
    
    if (!apiKeySelected) {
        setError("Please select an API key to use Magic Edit.");
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const base64Data = originalImage.split(',')[1];
      const mimeType = originalImage.match(/data:([^;]+);/)?.[1] ?? 'image/jpeg';
      const newImageBase64 = await editImageWithGemini(base64Data, mimeType, prompt);
      setEditedImage(`data:image/png;base64,${newImageBase64}`);
      setIsEditing(false);
      setPrompt('');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      if (errorMessage.includes("API key not found")) {
        setApiKeySelected(false); // Reset key state to re-trigger prompt
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `HybridCam_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full bg-[#0D0D0D] p-4 flex flex-col relative">
      <div className="flex items-center justify-between mb-4 z-10">
        <button onClick={onBack} className="p-2 text-white bg-black/50 rounded-full">
          <BackIcon />
        </button>
        <h1 className="text-xl font-bold text-white">Viewer</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-gray-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-white">Generating with AI...</p>
          </div>
        )}
        <img src={editedImage || originalImage} alt="Captured" className="max-w-full max-h-full object-contain rounded-lg" />
      </div>

      {isEditing && (
        <div className="absolute inset-0 bg-black/80 z-20 flex flex-col justify-end p-4">
            {error && <div className="bg-red-900/80 border border-red-500 text-white p-3 rounded-lg mb-2 text-center">{error}</div>}
            {!apiKeySelected && (
                 <div className="bg-blue-900/80 border border-blue-500 text-white p-3 rounded-lg mb-2 text-center">
                    <p className="mb-2">To use AI features, please select a Gemini API key. This is required for video generation.</p>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline text-[#FF8A00] mb-2 block">Learn about billing</a>
                    <button onClick={handleSelectApiKey} className="bg-[#FF8A00] text-black font-bold py-2 px-4 rounded-lg">Select API Key</button>
                </div>
            )}
            <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., make it a watercolor painting"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
                />
                <button onClick={handleMagicEdit} className="bg-[#0FA3A3] p-3 rounded-lg text-white disabled:opacity-50" disabled={isLoading}>
                    Go
                </button>
            </div>
            <button onClick={() => setIsEditing(false)} className="mt-2 text-gray-400 text-sm">Cancel</button>
        </div>
      )}
      
      <div className="mt-4 flex gap-4 z-10">
        <button onClick={() => setIsEditing(true)} className="flex-1 bg-[#0FA3A3] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors">
          <MagicIcon /> Magic Edit
        </button>
        <button onClick={handleDownload} className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors">
          <DownloadIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
