import React from 'react';
import {MeshProps} from 'react-three-fiber';

const Box: React.FC<MeshProps> = (props) => {
    return (
        <mesh
            {...props}
            scale={[1, 1, 1]}
        >
            <boxBufferGeometry />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
};

export default Box;