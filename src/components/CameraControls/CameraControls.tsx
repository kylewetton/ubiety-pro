import React, {useRef} from 'react';
import {MathUtils} from 'three';
import { CameraControlsProps } from './types';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {extend, useFrame, ReactThreeFiber, useThree} from 'react-three-fiber';
import config from '../../config/cameraControlsConfig';

extend({ OrbitControls });

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
      }
    }
  }

const CameraControls: React.FC<CameraControlsProps> = () => {

      const {enableDampening, enablePan, dampeningFactor, enableZoom, maxPolarAngle, minPolarAngle} = config;

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
        enableDamping={enableDampening}
        dampingFactor={dampeningFactor}
        enablePan={enablePan}
        maxPolarAngle={MathUtils.degToRad(maxPolarAngle)}
        minPolarAngle={MathUtils.degToRad(minPolarAngle)}
        />
    );
};

export default CameraControls;