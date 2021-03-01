type Map = 'color' | 'ao' | 'roughness' | 'normal' | 'alpha';

interface MaterialSettingsType {
    folder: string;
    color?: string;
}

interface Texture {
    maps: Map[],
    normalIntensity?: number
}

interface Textures {
    [key: string] : Texture
}

interface ProductConfigType {
    file: string;
    initialTextures: {[key: string]: MaterialSettingsType}
}

export const textures: Textures = {
    '/canvas': {
        maps: ['color', 'ao', 'normal'],
        normalIntensity: 0.1
        },
    '/wood': {maps: ['ao', 'color', 'normal', 'roughness']}
}

const productConfig: ProductConfigType = {
    file: '/shoe.glb',
    initialTextures: {
        'heel_counter' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'eyestay' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'foxing' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'inner' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'tongue' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'laces' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'badge' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'quarters' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'side_stripe' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'vamp' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'binding' : {
            folder: '/canvas',
            color: '#FFFFFF',
    },
        'shadow' : {
             folder: '/wood',
            color: '#FFFFFF',
    },
    }
}

export default productConfig;