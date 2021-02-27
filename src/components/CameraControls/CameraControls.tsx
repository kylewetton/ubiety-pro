import React, {useRef} from 'react';
import { CameraControlsProps } from './types';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {extend, useFrame, ReactThreeFiber, useThree} from 'react-three-fiber';

extend({ OrbitControls });

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
      }
    }
  }

const CameraControls: React.FC<CameraControlsProps> = ({enableZoom = true}) => {

      const {
        camera,
        gl: { domElement }
    } = useThree();


    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef<OrbitControls | null>();
    useFrame(state => controls.current && controls.current.update());

    return (
        <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableZoom={enableZoom}
        // maxAzimuthAngle={Math.PI / 4}
        // minAzimuthAngle={-Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        />
    );
};

export default CameraControls;