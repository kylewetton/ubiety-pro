import { ThunkAction } from "@reduxjs/toolkit";
import {Action, Dispatch} from 'redux';
import {GetState, RootState} from '../../store';
import {productAddMaterials} from './actions';
import {Texture} from './types';

export const thunkProductLoadMaterials = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {

    // async some stuff
    const response: Texture[] = [
        {
            id: 'canvas',
            src: '/canvas',
            maps: ['color', 'ao', 'normal'],
            normalIntensity: 0.2,
            flipY: false
        },
        {
            id: 'wood',
            src: '/wood',
            maps: ['color', 'ao', 'normal', 'roughness'],
            normalIntensity: 0.2,
            flipY: false
        }
    ];

    dispatch(productAddMaterials(response));
}