
import { CameraMode, CameraConfig } from './types';

export const MODES: CameraMode[] = [
  CameraMode.PHOTO,
  CameraMode.PRO,
  CameraMode.NIGHT,
  CameraMode.PORTRAIT,
  CameraMode.PANORAMA,
  CameraMode.VIDEO,
  CameraMode.ASTRO,
];

export const sampleConfig: CameraConfig = {
  "camera_id": "main",
  "lens_distortion": {"k1": -0.12, "k2": 0.02},
  "noise_model": {"read_noise": 1.8, "gain_curve": [[1,1.02],[100,1.1]]},
  "burst_settings": {"frames": 7, "exposure_steps": [-2,-1,0,1,2]},
  "color_profiles": [
    {"name": "Natural", "lut_path": "profiles/natural.cube"},
    {"name": "Vivid", "lut_path": "profiles/vivid.cube"}
  ]
};
