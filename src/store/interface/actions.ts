import { INTERFACE_UPDATE_POINTER, interfaceActionTypes } from './types';

export function interfaceUpdatePointer(data: any): interfaceActionTypes {
    return {
        type: INTERFACE_UPDATE_POINTER,
        payload: data
    }
}