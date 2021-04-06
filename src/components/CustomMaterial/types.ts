export interface CustomMaterialProps {
    uid: number;
    color: string;
    customTexture?: string | null;
    override?: {[key: string]: string};
}