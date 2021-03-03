type Map = 'color' | 'ao' | 'roughness' | 'normal' | 'alpha';

interface MaterialSettingsType {
    tag: string;
    color?: string;
}

interface Texture {
    maps: Map[],
    normalIntensity?: number,
    flipY?: boolean
}

interface ProductConfigType {
    file: string;
    initialMaterials: {[key: string]: MaterialSettingsType}
}

const productConfig: ProductConfigType = {
    file: '/shoe.glb',
    initialMaterials: {
        'heel_counter' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'eyestay' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'foxing' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'inner' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'tongue' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'laces' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'badge' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'quarters' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'side_stripe' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'vamp' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'binding' : {
            tag: 'canvas',
            color: '#FFFFFF',
    },
        'shadow' : {
             tag: 'shadow',
            color: '#222222',
    },
    }
}

export default productConfig;