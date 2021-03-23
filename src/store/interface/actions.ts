import { INTERFACE_UPDATE_POINTER, INTERFACE_TOGGLE_MODAL, interfaceActionTypes } from './types';

export function interfaceUpdatePointer(data: any): interfaceActionTypes {
    return {
        type: INTERFACE_UPDATE_POINTER,
        payload: data
    }
}

export function interfaceToggleModal(data: {id: string; status: 'open' | 'closed'}): interfaceActionTypes {
    return {
        type: INTERFACE_TOGGLE_MODAL,
        payload: data
    }
}