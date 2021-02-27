import { useMemo } from 'react'
import { unstable_createResource as createResource } from './helpers/react-cache';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const resource = createResource((file: any) => new Promise(async res => new GLTFLoader().load(file, res)))

export default function useModel(file: any) {
  const { scene } = resource.read(file)
  const geom = useMemo(() => {
    const temp: any[] = []
    scene.traverse((child: any) => child.isMesh && temp.push(child.geometry))
    return temp
  }, [scene])
  return [geom, scene.children[0].position]
}
