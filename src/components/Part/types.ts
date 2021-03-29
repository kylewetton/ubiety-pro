export interface PartProps {
    materialUid: number;
    color: string;
    mesh: any;
    locked: boolean;
    id: string;
    tag?: string;
    customTexture?: string | null;
    override?: {[key: string]: string};
}