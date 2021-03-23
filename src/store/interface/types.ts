export interface interfaceState {
  pointer: {x: number; y: number};
  modalIsOpen: {[key: string]: 'open' | 'closed'}
};

// action

export const INTERFACE_UPDATE_POINTER = 'INTERFACE_UPDATE_POINTER';
export const INTERFACE_TOGGLE_MODAL = 'INTERFACE_TOGGLE_MODAL';

interface interfaceAction {
    type: typeof INTERFACE_UPDATE_POINTER
    | typeof INTERFACE_TOGGLE_MODAL,
    payload: any
}

export type interfaceActionTypes = interfaceAction;
