export type interfaceState = {
  pointer: {x: number; y: number}
};

// action

export const INTERFACE_UPDATE_POINTER = 'INTERFACE_UPDATE_POINTER';

interface interfaceAction {
    type: typeof INTERFACE_UPDATE_POINTER,
    payload: any
}

export type interfaceActionTypes = interfaceAction;
