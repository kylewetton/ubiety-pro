import { ThunkAction } from "@reduxjs/toolkit";
import {Action, Dispatch} from 'redux';
import {GetState, RootState} from '../../store';
import {productAddMaterials, productAddModelData, productAddCartVariationIds} from './actions';
import {shapeTextureData} from '../../utils';
import pathConfig from '../../config/pathConfig';

const IS_STANDALONE = process.env.STANDALONE === 'true';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

console.log(process.env.STANDALONE);

if (IS_STANDALONE)
    console.log('Running standalone version, loading mock data');

const mockProductData = IS_STANDALONE ? require('../../mock/product.json') : null;
const mockTextureData = IS_STANDALONE ? require('../../mock/texture.json') : null;

const PRODUCT_ID = IS_DEVELOPMENT ? '51' : document.getElementById('post_id')?.dataset.id;

export const thunkProductLoadMaterials = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {
    fetch(IS_STANDALONE ? `https://jsonplaceholder.typicode.com/todos/100` : pathConfig.endpoints.texture)
    .then(res => res.json())
    .then(data => IS_STANDALONE ? shapeTextureData(mockTextureData) : shapeTextureData(data))
    .then(textures => {
        dispatch(productAddMaterials([{
            uid: -2,
            tag: 'stampa',
            src:'/stampa',
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
    fetch(IS_STANDALONE ? `https://jsonplaceholder.typicode.com/todos/100` : `${pathConfig.endpoints.product}/${PRODUCT_ID}`)
    .then(res => res.json())
    .then(data => IS_STANDALONE ? dispatch(productAddModelData(mockProductData)) : dispatch(productAddModelData(data)))
    .catch(error => console.error('thunkProductLoadModel was not successful', error));
}

export const thunkProductLoadVariationIds = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {

    if (IS_STANDALONE) return false;

    const variationIdAction = {
        action: 'ubiety_collect_variation_ids',
    };
    fetch(pathConfig.endpoints.cart, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        body: new URLSearchParams(variationIdAction)
    }).then(res => res.json())
    .then(data => dispatch(productAddCartVariationIds(data)))
    .catch(error => console.error('thunkProductLoadVariationIds was not successful', error));
}