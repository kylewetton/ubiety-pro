type Point = [x: number, y: number, z: number];

interface WorldConfig {
    effects: boolean;
    worldOffset: Point
}

const worldConfig: WorldConfig = {
    effects: false,
    worldOffset: [0, -0.2, 0]
}

export default worldConfig;