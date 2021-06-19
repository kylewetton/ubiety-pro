const {protocol: PROTOCOL, hostname: HOST} = window.location;
    let hostname = HOST;
    let API = `${PROTOCOL}//${hostname}`;
if (process.env.NODE_ENV === 'development')
    API = `https://livree.test`;

const pathConfig = {
    endpoints: {
        texture: `${API}/wp-json/wp/v2/texture`,
        product: `${API}/wp-json/wp/v2/custom`,
        cart: `${API}/wp-admin/admin-ajax.php`
    },
    textures: `${API}/ubiety/textures`,
    cubemap: `${API}/ubiety/textures/cubemap/medium-studio/`,
    stampa: `${API}/ubiety/textures/stampa`
}


export default pathConfig;