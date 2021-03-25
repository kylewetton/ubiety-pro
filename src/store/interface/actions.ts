import { INTERFACE_UPDATE_POINTER, INTERFACE_SET_ACTIVE_STAGE, INTERFACE_TOGGLE_MODAL, interfaceActionTypes } from './types';

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

export function interfaceSetActiveStage(data: string): interfaceActionTypes {
    return {
        type: INTERFACE_SET_ACTIVE_STAGE,
        payload: data
    }
}