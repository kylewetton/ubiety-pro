import React, {Suspense, useEffect} from 'react';
import {Canvas} from 'react-three-fiber';
import { EffectComposer, SSAO, SMAA } from 'react-postprocessing';
import worldConfig from '../../config/worldConfig';
import cameraConfig from '../../config/cameraConfig';
import {WorldDiv} from './styles/WorldStyles';
import { WorldProps } from './types';
import Product from '../Product';
import {useDispatch, Provider, useSelector} from 'react-redux';
import CameraControls from '../CameraControls';
import { productAddParts, productSetActivePart, productSetTextureToActive, productSetColorToActive } from '../../store/product/actions';
import {store} from '../../store';
import { useGLTF, PerspectiveCamera } from 'drei';
import Button from '../Button';
import { getAllProductParts } from '../../store/product/selectors';

const World: React.FC<WorldProps> = () => {
    const dispatch = useDispatch();
    
    /**
     * Data
     */
    const d = 8.25;
    const { effects } = worldConfig;
    const { nodes } = useGLTF('/shoe.glb');
    
    /**
     * State
     */
    const PARTS = useSelector(getAllProductParts);

    useEffect(() => {
        dispatch(productAddParts(nodes));
    }, [nodes, dispatch]);
    

    /**
     * Methods
     * @private
     */

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


    const _handleDebugChangeTexture = (folder: string) => {
        dispatch(productSetTextureToActive(folder));
    }

    const _handleDebugChangeColor = (hex: string) => {
        dispatch(productSetColorToActive(hex));
    }

    const _handleDebugSetActive = (tag: string) => {
        const partToSetActive = PARTS.filter(part => part.tag === tag)[0];
        dispatch(productSetActivePart(partToSetActive.id));
    }

    return (
        <WorldDiv>
            <div style={{position: 'absolute', top: '1rem', left: '1rem', zIndex: 999}}>
                <Button onClick={() => _handleDebugSetActive('quarters')}>Quarters</Button>
                <Button onClick={() => _handleDebugSetActive('tongue')}>Tongue</Button>
                <Button onClick={() => _handleDebugChangeTexture('/wood')}>Make Wood</Button>
                <Button onClick={() => _handleDebugChangeTexture('/canvas')}>Make Canvas</Button>
                <Button onClick={() => _handleDebugChangeColor('#FF0000')}>Make Red</Button>
            </div>
            <Canvas concurrent={false}>
                {/** Scene */}
                <PerspectiveCamera position={cameraConfig.position} fov={cameraConfig.fov} />
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