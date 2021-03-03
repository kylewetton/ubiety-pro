import { ThunkAction } from "@reduxjs/toolkit";
import {GetState, RootState} from '../../store';
import {Action, Dispatch} from 'redux';

export const thunkinterfaceLoad = (): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch: Dispatch, getState: GetState) => {
    // load action
    // async some stuff
    // dispatch action
}