import React, {Suspense, useEffect} from 'react';
import {Canvas} from 'react-three-fiber';
import { EffectComposer, SSAO, SMAA } from 'react-postprocessing';
import worldConfig from '../../config/worldConfig';
import cameraConfig from '../../config/cameraConfig';
import {WorldDiv} from './styles/WorldStyles';
import { WorldProps } from './types';
import _filter from 'lodash/filter';
import Product from '../Product';
import {useDispatch, Provider } from 'react-redux';
import CameraControls from '../CameraControls';
import { productAddMeshParts } from '../../store/product/actions';
import {store} from '../../store';
import { useGLTF } from 'drei';

const World: React.FC<WorldProps> = ({model}) => {
    const dispatch = useDispatch();
    
    /**
     * Data
     */

    const d = 8.25;
    const { effects } = worldConfig;
    const { nodes } = useGLTF(model);
    
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
    )  

    if (!nodes)
        return null;

    return (    
        <WorldDiv>
            <Canvas
                gl={{antialias: true}}
                pixelRatio={window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio}
                concurrent={false}
                raycaster={{ filter: _intersectionsFilter }}
                camera={{ fov: cameraConfig.fov, position: cameraConfig.position }}
            >
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