import { ThunkAction } from "@reduxjs/toolkit";
import {Action, Dispatch} from 'redux';
import {GetState, RootState} from '../../store';
import {productAddMaterials, productAddModelData, productAddCartVariationIds} from './actions';
import {shapeTextureData} from '../../utils';
import pathConfig from '../../config/pathConfig';
// const mockProductData = require('../../mock/product.json');
// const mockTextureData = require('../../mock/texture.json');

const PRODUCT_ID = process.env.NODE_ENV === 'development' ? '51' : document.getElementById('post_id')?.dataset.id;

export const thunkProductLoadMaterials = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {
    fetch(pathConfig.endpoints.texture)
    .then(res => res.json())
    .then(data => shapeTextureData(data))
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
    // fetch('https://jsonplaceholder.typicode.com/todos/100')
    fetch(`${pathConfig.endpoints.product}/${PRODUCT_ID}`)
    .then(res => res.json())
    .then(data => dispatch(productAddModelData(data)))
    .catch(error => console.error('thunkProductLoadModel was not successful', error));
}

export const thunkProductLoadVariationIds = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {
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