import { ThunkAction } from "@reduxjs/toolkit";
import {Action, Dispatch} from 'redux';
import {GetState, RootState} from '../../store';
import {productAddMaterials, productAddModelData} from './actions';
import {shapeTextureData} from '../../utils';
const mockProductData = require('../../mock/product.json');
const mockTextureData = require('../../mock/texture.json');

export const thunkProductLoadMaterials = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {
    // fetch('http://192.168.1.2/wp-json/wp/v2/texture')
    fetch('https://jsonplaceholder.typicode.com/todos/100')
    .then(res => res.json())
    .then(data => shapeTextureData(mockTextureData))
    .then(textures => {
        dispatch(productAddMaterials([{
            uid: -2,
            tag: 'stampa',
            src: '/stampa',
            maps: ['alpha'],
            normalIntensity: 3,
            flipY: true,
            swatches: [],
            metallic: false,
        }, ...textures])
    )})
    .catch(error => console.error('thunkProductLoadMaterials was not successful', error));
}

export const thunkProductLoadModel = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {
    // fetch('http://192.168.1.2/wp-json/wp/v2/custom/51')
    fetch('https://jsonplaceholder.typicode.com/todos/100')
    .then(res => res.json())
    .then(data => dispatch(productAddModelData(mockProductData)))
    .catch(error => console.error('thunkProductLoadModel was not successful', error));
}