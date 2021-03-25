type Point = [x: number, y: number, z: number];
interface Light {
    id: string;
    color: string;
    position: [x: number, y: number, z: number];
    mapSize: number,
    intensity: number,
    shadows: boolean
}

interface WorldConfig {
    backgroundColor: string;
    effects: boolean;
    worldOffset: Point;
    lighting: Light[];
}

const spotlightIntensity = 10; // 10;
const spotlightDistance = 10; // 10;
const spotlightHeightReduction = 3; // 3;
const spotlightHeight = spotlightDistance - spotlightHeightReduction;


const worldConfig: WorldConfig = {
    backgroundColor: '#f1f3f4',
    effects: false,
    worldOffset: [0, -0.33, 0],
    lighting:  [
        /**
         * Top spotlight
         */
        {
          id: 'spot',
          color: '#FFFFFF',
          position: [0, spotlightDistance + spotlightHeightReduction, 0],
          intensity: spotlightIntensity - spotlightIntensity / 3,
          mapSize: 1024,
          shadows: false,
        },

        /**
         * Inner spotlight
         */
        {
          id: 'spot',
          color: '#FFFFFF',
          position: [spotlightDistance, spotlightHeight, 0],
          intensity: spotlightIntensity,
          mapSize: 1024,
          shadows: false,
        },
        /**
         * Outer spotlight
         */
        {
          id: 'spot',
          color: '#FFFFFF',
          position: [spotlightDistance * -1, spotlightHeight, 0 ],
          intensity: spotlightIntensity,
          mapSize: 1024,
          shadows: false,
        },
        /**
         * Front spotlight
         */
        {
          id: 'spot',
          color: '#FFFFFF',
          position: [0, spotlightHeight, spotlightDistance],
          intensity: spotlightIntensity,
          mapSize: 1024,
          shadows: false,
        },
        /**
         * Rear spotlight
         */
        {
          id: 'spot',
          color: '#FFFFFF',
          position: [0, spotlightHeight, spotlightDistance * -1],
          intensity: spotlightIntensity,
          mapSize: 1024,
          shadows: false,
        },
      ],
}

export default worldConfig;