export interface CustomMaterialProps {
    uid: number;
    color: string;
    customTexture?: string;
    override?: {[key: string]: string};
}