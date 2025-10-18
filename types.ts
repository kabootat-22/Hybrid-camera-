
export enum CameraMode {
  PHOTO = 'Photo',
  PRO = 'Pro',
  NIGHT = 'Night',
  PORTRAIT = 'Portrait',
  PANORAMA = 'Panorama',
  VIDEO = 'Video',
  ASTRO = 'Astro',
}

export enum Screen {
  SPLASH = 'splash',
  VIEWFINDER = 'viewfinder',
  PROFILES = 'profiles',
  SETTINGS = 'settings',
  VIEWER = 'viewer',
}

export interface CameraConfig {
  camera_id: string;
  lens_distortion: { k1: number; k2: number };
  noise_model: { read_noise: number; gain_curve: number[][] };
  burst_settings: { frames: number; exposure_steps: number[] };
  color_profiles: { name: string; lut_path: string }[];
}
