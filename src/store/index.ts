import { combineReducers } from "@reduxjs/toolkit";
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import {mailReducer} from './mail/reducers';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
    mail: mailReducer
});

export const store = configureStore({
    reducer: rootReducer
});

type State = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, Action>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type GetState = typeof store.getState;