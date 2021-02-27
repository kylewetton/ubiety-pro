interface ProductConfigType {
    file: string;
    initialTextures: {[key: string]: string}
}

const productConfig: ProductConfigType = {
    file: '/shoe.glb',
    initialTextures: {
        'heel_counter' : '/canvas',
        'eyestay' : '/canvas',
        'foxing' : '/canvas',
        'inner' : '/canvas',
        'tongue' : '/wood',
        'laces' : '/canvas',
        'badge' : '/canvas',
        'quarters' : '/wood',
        'side_stripe' : '/canvas',
        'vamp' : '/canvas',
        'binding' : '/canvas',
        'shadow' : '/canvas'
    }
}

export default productConfig;