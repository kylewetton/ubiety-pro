export interface ButtonProps {
    className?: string;
    color?: 'green' | 'blue' | 'mint' | 'gray';
    onClick?: (event: React.MouseEvent) => void;
    minimal?: boolean;
    big?: boolean;
    block?: boolean;
    align? : 'left' | 'center' | 'right';
    boldupper?: boolean;
}