
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraMode } from '../types';
import ModePicker from './ModePicker';
import ShutterButton from './ShutterButton';
import { FlashIcon, TimerIcon, RatioIcon, GalleryIcon } from './icons/ControlIcons';

interface ViewfinderProps {
  onCapture: (image: string) => void;
}

const Viewfinder: React.FC<ViewfinderProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              setIsCameraReady(true);
            };
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
          setError("Could not access camera. Please check permissions and refresh.");
        }
      } else {
        setError("Your browser does not support camera access.");
      }
    }
    setupCamera();
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Simulate processing time for HDR+, NightStack etc.
      setTimeout(() => {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        onCapture(dataUrl);
        setIsProcessing(false);
      }, 1500);
    } else {
        setIsProcessing(false);
    }
  }, [onCapture]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <canvas ref={canvasRef} className="hidden" />

      {error && <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-center p-4"><p>{error}</p></div>}
      
      {!isCameraReady && !error && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-[#0FA3A3] border-gray-700 rounded-full animate-spin"></div>
        </div>
      )}

      {isProcessing && (
         <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-gray-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg">Processing Image...</p>
         </div>
      )}

      {/* UI Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Rail */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-black/50 p-2 rounded-full pointer-events-auto">
          <button className="text-white"><FlashIcon /></button>
          <button className="text-white"><TimerIcon /></button>
          <button className="text-white"><RatioIcon /></button>
        </div>

        {/* Right Rail (Zoom/Exposure simulation) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-64 w-1 bg-white/20 rounded-full pointer-events-auto">
          <div className="w-full h-1/2 bg-[#0FA3A3] absolute bottom-0 rounded-full"></div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center">
          <div className="pointer-events-auto w-full max-w-md">
            <ModePicker />
          </div>
          <div className="flex items-center justify-around w-full max-w-md mt-4 pointer-events-auto">
             <button className="text-white opacity-50"><GalleryIcon /></button>
            <ShutterButton onClick={handleCapture} />
            <div className="w-12 h-12"></div> {/* Spacer */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewfinder;
