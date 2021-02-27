import React, {Suspense} from 'react';
import {Canvas} from 'react-three-fiber';
import { EffectComposer, SSAO, SMAA } from 'react-postprocessing';
import {WorldDiv} from './styles/WorldStyles';
import { WorldProps } from './types';
import Product from '../Product';
import CameraControls from '../CameraControls';

const World: React.FC<WorldProps> = () => {
    return (
        <WorldDiv>
            <Canvas concurrent shadowMap>
                <ambientLight />
                <CameraControls />

                <Suspense fallback={null}>
                    <Product file={'shoe.glb'} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
                    <EffectComposer multisampling={0}>
                        <SSAO
                        intensity={40}
                        luminanceInfluence={0.2}
                        radius={8}
                        scale={0.5}
                        bias={0.5}
                        distanceThreshold={0.5}
                        distanceFalloff={0.03}
                        rangeFalloff={0.001}
                        />
                        <SMAA />
                    </EffectComposer>
                </Suspense>

            </Canvas>
        </WorldDiv>
    );
};

export default World;