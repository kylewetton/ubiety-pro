export interface interfaceState {
  pointer: {x: number; y: number};
  currentStage: 'materials' | 'initials' | 'customText' | 'customImage';
  modalIsOpen: {[key: string]: 'open' | 'closed'};
};

// action

export const INTERFACE_UPDATE_POINTER = 'INTERFACE_UPDATE_POINTER';
export const INTERFACE_TOGGLE_MODAL = 'INTERFACE_TOGGLE_MODAL';
export const INTERFACE_SET_ACTIVE_STAGE = 'INTERFACE_SET_ACTIVE_STAGE';

interface interfaceAction {
    type: typeof INTERFACE_UPDATE_POINTER
    | typeof INTERFACE_SET_ACTIVE_STAGE
    | typeof INTERFACE_TOGGLE_MODAL,
    payload: any
}

export type interfaceActionTypes = interfaceAction;
