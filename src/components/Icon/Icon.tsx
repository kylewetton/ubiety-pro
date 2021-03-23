import React from 'react';
import {IconDiv} from './styles/IconStyles';
import { IconProps } from './types';

const svgs = {
    left: <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 15 15">
        <path d="M12,13.45a.62.62,0,0,0,.09-.32V1.88A.63.63,0,0,0,12,1.55a.59.59,0,0,0-.24-.23.64.64,0,0,0-.33-.07.72.72,0,0,0-.32.11L3,7a.53.53,0,0,0-.2.22.64.64,0,0,0,0,.58A.53.53,0,0,0,3,8l8.12,5.63a.72.72,0,0,0,.32.11.64.64,0,0,0,.33-.07A.59.59,0,0,0,12,13.45Z"/>
    </svg>,  
    right:  <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.46 13.6788C3.5611 13.7313 3.67462 13.7554 3.78836 13.7484C3.90211 13.7413 4.01179 13.7034 4.10562 13.6388L12.2306 8.01375C12.3136 7.95623 12.3815 7.87945 12.4284 7.78998C12.4752 7.7005 12.4997 7.60101 12.4997 7.5C12.4997 7.399 12.4752 7.2995 12.4284 7.21003C12.3815 7.12056 12.3136 7.04377 12.2306 6.98625L4.10562 1.36125C4.01186 1.29637 3.90213 1.25838 3.78832 1.25139C3.67451 1.2444 3.56096 1.26867 3.45996 1.32159C3.35895 1.3745 3.27435 1.45404 3.21531 1.55159C3.15627 1.64914 3.12504 1.76098 3.125 1.875V13.125C3.12498 13.2391 3.15619 13.351 3.21524 13.4486C3.27429 13.5462 3.35894 13.6258 3.46 13.6788Z" fill="black"/>
    </svg>,
    menu: <svg width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8125 6.23438H23.1875" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
    <path d="M4.8125 10.5H23.1875" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
    <path d="M4.8125 14.7656H23.1875" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
    </svg>
}

const Icon: React.FC<IconProps> = ({icon}) => {
    return (
        <IconDiv>
            {svgs[icon]}
        </IconDiv>
    );
};

export default Icon;