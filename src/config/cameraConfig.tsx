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
    position: [-3, 0, 2],
  };

  export default cameraConfig;