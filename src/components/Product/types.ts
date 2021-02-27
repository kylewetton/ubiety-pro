import {Object3D} from 'three';

type Vector3 = [number, number, number];

export interface ProductProps {
 file: {[name: string]: Object3D};
 rotation?: Vector3;
}