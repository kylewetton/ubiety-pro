import { combineReducers } from "@reduxjs/toolkit";
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import {productReducer} from './product/reducers';
import {interfaceReducer} from './interface/reducers';
import { ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
    product: productReducer,
    interface: interfaceReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type State = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, Action>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type GetState = typeof store.getState;