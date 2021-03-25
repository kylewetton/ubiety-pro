import React, {Suspense, useEffect} from 'react';
import {Canvas, useResource} from 'react-three-fiber';
import {useDispatch, Provider } from 'react-redux';
import { EffectComposer, SSAO, SMAA } from 'react-postprocessing';
import _filter from 'lodash/filter';
import { useGLTF } from 'drei';
import {Color, GammaEncoding, LinearToneMapping, NoToneMapping, PCFSoftShadowMap} from 'three';
import worldConfig from '../../config/worldConfig';
import cameraConfig from '../../config/cameraConfig';
import {WorldDiv} from './styles/WorldStyles';
import { WorldProps } from './types';
import Product from '../Product';
import CameraControls from '../CameraControls';
import { productAddMeshParts } from '../../store/product/actions';
import {store} from '../../store';

const World: React.FC<WorldProps> = ({model}) => {
    const dispatch = useDispatch();
    
    /**
     * Data
     */
    const { effects, lighting } = worldConfig;
    const { nodes } = useGLTF(model);
    // const ref = useResource();
    
    /**
     * State
     */

    useEffect(() => {
        const meshParts = _filter(nodes, part => part.name !== 'Scene' );
        const sceneId = _filter(nodes, part => part.name === 'Scene')[0].uuid;
        dispatch(productAddMeshParts({meshParts, sceneId}));
    }, [dispatch, nodes]);
    

    /**
     * Methods
     * @private
     */

    const _intersectionsFilter = (intersections: any) => {
        return intersections?.length ? [intersections[0]] : intersections;
    }

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
    );
    

    if (!nodes)
        return null;

    return (    
        <WorldDiv>
            <Canvas
                gl={{
                    antialias: true,
                    preserveDrawingBuffer: true,
                    alpha: false
                }}
                onCreated={({gl}) => {
                    gl.toneMappingExposure = 1;
                    gl.setClearColor(worldConfig.backgroundColor);
                    gl.outputEncoding = GammaEncoding;
                    gl.physicallyCorrectLights = true;
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = PCFSoftShadowMap;
                    gl.toneMapping = NoToneMapping;
                    
                }}
                pixelRatio={window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio}
                concurrent={true}
                raycaster={{ filter: _intersectionsFilter }}
                camera={{ fov: cameraConfig.fov, position: cameraConfig.position }}
            >
                {/** Scene */}
                <CameraControls />
                <hemisphereLight intensity={0.66} groundColor={new Color('#FFFFFF')} position={[0, 50, 0]} />
                {lighting.map((light, idx) => (
                    <spotLight
                        key={idx}
                        color={light.color}
                        position={light.position}
                        intensity={light.intensity}
                        castShadow={false}
                    />
                ))}
                
                {/** Model */}
                <Provider store={store}>
                    <Suspense fallback={<p>Creating something awesome...</p>}>
                        <Product file={nodes} rotation={[0, 0, 0]} />
                    </Suspense>
                </Provider>
                {/** Effects */}
                {effects && _renderEffectComposer()}
                
            </Canvas>
        </WorldDiv>
    );
};

export default World;