import React, {Suspense} from 'react';
import {Canvas} from 'react-three-fiber';
import { EffectComposer, SSAO, SMAA } from 'react-postprocessing';
import worldConfig from '../../config/worldConfig';
import {WorldDiv} from './styles/WorldStyles';
import { WorldProps } from './types';
import {useModel} from '../../hooks';
import Product from '../Product';
import {useDispatch, Provider} from 'react-redux';
import CameraControls from '../CameraControls';
import { productAddParts } from '../../store/product/actions';
import {store} from '../../store';
import { useGLTF } from 'drei';

const World: React.FC<WorldProps> = () => {
    const dispatch = useDispatch();

    const d = 8.25;
    const { effects } = worldConfig;

    const _renderEffectComposer = () => (
        <EffectComposer multisampling={2}>
            <SSAO
            intensity={20}
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
    )  

    const { nodes } = useGLTF('/shoe.glb');
    dispatch(productAddParts(nodes));

    return (
        <WorldDiv>
            <Canvas concurrent={false}>
                {/** Scene */}
                <CameraControls />
                <hemisphereLight intensity={0.5} position={[0, 50, 0]} />
                <directionalLight
                    position={[-8, 20, 8]}
                    shadow-camera-left={d * -1}
                    shadow-camera-bottom={d * -1}
                    shadow-camera-right={d}
                    shadow-camera-top={d}
                    shadow-camera-near={0.1}
                    shadow-camera-far={1500}
                    castShadow
                />
                <Suspense fallback={null}>
                    {/** Model */}
                    <Provider store={store}>
                        <Product file={nodes} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
                    </Provider>
                    {/** Effects */}
                    {effects && _renderEffectComposer()}
                </Suspense>
            </Canvas>
        </WorldDiv>
    );
};

export default World;