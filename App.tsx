
import React, { useState, useEffect, useCallback } from 'react';
import { CameraMode, Screen } from './types';
import Viewfinder from './components/Viewfinder';
import SplashScreen from './components/SplashScreen';
import ProfileManager from './components/ProfileManager';
import SettingsPage from './components/SettingsPage';
import ImageViewer from './components/ImageViewer';
import { sampleConfig } from './constants';
import { ProfileIcon, SettingsIcon } from './components/icons/NavigationIcons';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [lastCapturedImage, setLastCapturedImage] = useState<string | null>(null);
  const [config, setConfig] = useState(sampleConfig);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen(Screen.VIEWFINDER);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const onCapture = (image: string) => {
    setLastCapturedImage(image);
    setEditedImage(image); // Initialize edited image with the original capture
    setCurrentScreen(Screen.VIEWER);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <SplashScreen />;
      case Screen.VIEWFINDER:
        return <Viewfinder onCapture={onCapture} />;
      case Screen.PROFILES:
        return <ProfileManager config={config} setConfig={setConfig} onBack={() => handleNavigate(Screen.VIEWFINDER)} />;
      case Screen.SETTINGS:
        return <SettingsPage onBack={() => handleNavigate(Screen.VIEWFINDER)} />;
      case Screen.VIEWER:
        return lastCapturedImage && <ImageViewer 
          originalImage={lastCapturedImage} 
          editedImage={editedImage}
          setEditedImage={setEditedImage}
          onBack={() => {
            setLastCapturedImage(null);
            setEditedImage(null);
            handleNavigate(Screen.VIEWFINDER);
          }} />;
      default:
        return <Viewfinder onCapture={onCapture} />;
    }
  };
  
  const showNav = currentScreen === Screen.VIEWFINDER;

  return (
    <div className="w-screen h-screen bg-[#0D0D0D] font-sans overflow-hidden select-none">
      {renderScreen()}
      {showNav && (
         <div className="absolute top-4 right-4 flex flex-col gap-4 z-30">
          <button onClick={() => handleNavigate(Screen.PROFILES)} className="p-2 bg-black/50 rounded-full">
            <ProfileIcon />
          </button>
          <button onClick={() => handleNavigate(Screen.SETTINGS)} className="p-2 bg-black/50 rounded-full">
            <SettingsIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
