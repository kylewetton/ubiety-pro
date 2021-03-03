import { ThunkAction } from "@reduxjs/toolkit";
import {Action, Dispatch} from 'redux';
import {GetState, RootState} from '../../store';
import {productAddMaterials, productAddModelData} from './actions';
import {Texture} from './types';

export const thunkProductLoadMaterials = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {

    // async some stuff
    const response: Texture[] = [
        {
            tag: 'canvas',
            src: '/canvas',
            maps: ['color', 'ao', 'normal'],
            normalIntensity: 0.2,
        },
        {
            tag: 'shadow',
            src: '/shadow',
            maps: ['alpha'],
            flipY: true
        },
        {
            tag: 'wood',
            src: '/wood',
            maps: ['color', 'ao', 'normal', 'roughness'],
            normalIntensity: 0.2,
        },
        {
            tag: 'foxing',
            src: '/foxing',
            maps: ['color'],
            normalIntensity: 0.2,
            flipY: false
        },
        {
            tag: 'foxing_toe',
            src: '/foxing_toe',
            maps: ['color'],
            normalIntensity: 0.2,
            flipY: false
        }
    ];

    dispatch(productAddMaterials(response));
}

export const thunkProductLoadModel = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {

    console.log("xx in thunk");
    // async some stuff
    // 192.168.1.2
    fetch('http://localhost/wp-json/wp/v2/custom/51')
    .then(res => res.json())
    .then(data => {
        dispatch(productAddModelData(data))
    })
    .catch(error => console.error('thunkProductLoadModel was not successfull'));
}