
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#0D0D0D] animate-fadeIn">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-wider text-white animate-fadeAndScale">
          <span className="text-[#0FA3A3]">Hybrid</span>
          <span className="text-[#FF8A00]">Cam</span>
        </h1>
        <p className="text-sm text-gray-400 tracking-[0.3em] animate-fadeUp">COMPUTATIONAL IMAGING</p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeAndScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        .animate-fadeAndScale { animation: fadeAndScale 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-fadeUp { animation: fadeUp 1.5s 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default SplashScreen;
