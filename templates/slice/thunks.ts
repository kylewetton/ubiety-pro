import { ThunkAction } from "@reduxjs/toolkit";
import {GetState, RootState} from '../../src/store';
import {Action, Dispatch} from 'redux';

export const thunk__box__Load = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {

    // load action
    // async some stuff
    // dispatch action
}