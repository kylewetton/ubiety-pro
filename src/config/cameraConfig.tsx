import {Vector3} from 'three';

interface CameraConfig {
    fov: number,
    near: number,
    far: number,
    position: Vector3
}

const cameraConfig: CameraConfig = {
    fov: 30,
    near: 1,
    far: 300,
    position: new Vector3(0, 0, 1),
  };

  export default cameraConfig;