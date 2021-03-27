const {protocol: PROTOCOL, hostname: HOST} = window.location;
    let hostname = HOST;
if (process.env.NODE_ENV === 'development')
    hostname = `${HOST}:3001`;

const pathConfig = {
    endpoints: {
        texture: `${PROTOCOL}//${hostname}/wp-json/wp/v2/texture`,
        product: `${PROTOCOL}//${hostname}/wp-json/wp/v2/custom`,
        cart: `${PROTOCOL}//${hostname}/wp-admin/admin-ajax.php`
    },
    textures: `${PROTOCOL}//${hostname}/ubiety/textures`,
    cubemap: `${PROTOCOL}//${hostname}/ubiety/textures/cubemap/medium-studio/`,
    stampa: `${PROTOCOL}//${hostname}/ubiety/textures/stampa`
}


export default pathConfig;