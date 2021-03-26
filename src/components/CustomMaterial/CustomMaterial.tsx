import React, {useState, useEffect} from 'react';
import {useCubeTexture} from 'drei';
import { CustomMaterialProps } from './types';
import {useTexture} from 'drei';
import {fabric} from 'fabric';
import { Vector2, RepeatWrapping, Texture } from 'three';
import config from '../../config/brandConfig';
import _map from 'lodash/map';
import { useSelector } from 'react-redux';
import { getMaterialByUid } from '../../store/product/selectors';

const multiplyMaterialsTogether = (customBlob: string, baseTexture: string) => {
    const dimensions = 1024;
    const proxy = document.createElement('canvas');
    proxy.id = 'proxyCanvas';
    proxy.width = dimensions;
    proxy.height = dimensions;

    return new Promise<string>((res, rej) => {
        const canvas = new fabric.Canvas('proxyCanvas');
        canvas.setDimensions({width:dimensions, height:dimensions});
    
        fabric.Image.fromURL(baseTexture, (filt) => {

            filt.scaleToWidth(dimensions);

            const filter = new fabric.Image.filters.BlendImage({
              image: filt,
              mode: "multiply",
              alpha: 0.5,
            });

            fabric.Image.fromURL(customBlob, image => {
                image.scaleToWidth(dimensions);
                const customImage = image.set({left: 0, top: 0});
                if (filter) {
                    (customImage as any).filters.push(filter);
                    (customImage as any).applyFilters();
                }
                canvas.add(customImage);
                const comped = canvas.toDataURL();

                fetch(comped)
                .then(u => u.blob())
                .then(window.URL.createObjectURL)
                .then(res);
            })
        });
    });
}

/**
 * 
 * @param uid – the material uid
 */

const CustomMaterial: React.FC<CustomMaterialProps> = ({uid, color, customTexture, override}) => {

    const material = useSelector(getMaterialByUid(uid));
    const [compedCustomTexture, setCompedCustomTexture] = useState<string | null>(null);
    const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: '/cubemap/medium-studio/' });
    const maps = material && [...material.maps, 'custom'];

    useEffect(() => {
        if (customTexture) {
            if (material.maps.includes('color'))
            {
                multiplyMaterialsTogether(customTexture, `${material.src}/color.jpg`)
                .then(res => setCompedCustomTexture(res));
            } else {
            setCompedCustomTexture(customTexture);
            }
        } else {
            setCompedCustomTexture(null);
        }
    }, [customTexture, material]);


    // Convert to texture image paths
        const paths = maps.map(texture => {
            let fileName = override && override.hasOwnProperty(texture) ? override[texture] : texture;
            if (fileName === 'custom')
                return compedCustomTexture ? compedCustomTexture : '';
             return `${material.src}/${fileName}.jpg`
        }).filter(Boolean);

    // Load all the textures (useTexture returns an array)
    let texture: Texture[] | null = useTexture(paths);

    // Convert texture array to an object where the key === the index position of the map array
    let textureObj = Object.assign({}, texture);

    // Flip the textures if needed 
    // if (material.flipY)
      _map(textureObj, txt => {txt.flipY = false});
        
    
    // Set more texture values
    _map(textureObj, txt => {
        material.repeat && txt.repeat.set(material.repeat, material.repeat);
        txt.wrapS = RepeatWrapping;
        txt.wrapT = RepeatWrapping;
        return txt;
    });

    const _handleMapVsCustom = () => {
        switch(true) {
            case !!compedCustomTexture: 
                return textureObj[maps.indexOf('custom')];
            case maps.includes('color'):
                return textureObj[maps.indexOf('color')];
            default:
                return null;
        }

    }

    const _getTexture = () => (
        <meshStandardMaterial
            attach="material"
            color={compedCustomTexture ? color === config.hoverColor ? config.hoverColor : '#FFFFFF' : color}
            map={_handleMapVsCustom()}
            aoMap={maps.includes('ao') ? textureObj[maps.indexOf('ao')] : null}
            roughnessMap={maps.includes('roughness') ? textureObj[maps.indexOf('roughness')] : null}
            alphaMap={maps.includes('alpha') ? textureObj[maps.indexOf('alpha')] : null}
            normalMap={maps.includes('normal') ? textureObj[maps.indexOf('normal')] : null}
            normalScale={new Vector2(material.normalIntensity, material.normalIntensity)}
            transparent={true}
            onUpdate={(self) => (self.needsUpdate = true)}
        />);

    /**
     * @TODO Ground shadow
     */
    const _getGroundShadow = () => (
        <meshPhongMaterial
            attach="material"
            color={color}
            map={(maps.includes('color') ? textureObj[maps.indexOf('color')] : null)}
            aoMap={maps.includes('ao') ? textureObj[maps.indexOf('ao')] : null}
            alphaMap={maps.includes('alpha') ? textureObj[maps.indexOf('alpha')] : null}
            normalMap={maps.includes('normal') ? textureObj[maps.indexOf('normal')] : null}
            normalScale={new Vector2(material.normalIntensity, material.normalIntensity)}
            transparent={true}
            shininess={0}
            onUpdate={(self) => (self.needsUpdate = true)}
        />
    );

    const _getNonTexturedMaterial = () => (
        <meshPhysicalMaterial
            attach="material"
            color={color}
            metalness={material.metallic ? 1 : 0}
            roughness={0}
            envMap={envMap}
        />
    );

    switch(true) {
        case(maps.includes('alpha')) :
            return _getGroundShadow();
        case(maps.length === 0) :
            return _getNonTexturedMaterial();
        default :
            return _getTexture();
    }

};

export default CustomMaterial;