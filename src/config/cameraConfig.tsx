import {Vector3} from 'three';

interface CameraConfig {
    fov: number,
    near: number,
    far: number,
    position: [x: number, y: number, z: number]
}

const cameraConfig: CameraConfig = {
    fov: 30,
    near: 1,
    far: 300,
    position: [0, 0, 5],
  };

  export default cameraConfig;