type Map = 'color' | 'ao' | 'roughness' | 'normal' | 'alpha';

interface MaterialSettingsType {
    folder: string;
    color?: string;
}

interface ProductConfigType {
    file: string;
    initialTextures: {[key: string]: MaterialSettingsType}
}

export const textureMaps: {[key: string] : Map[]} = {
    '/canvas': ['color', 'ao', 'normal'],
    '/wood': ['ao', 'color', 'normal', 'roughness']
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