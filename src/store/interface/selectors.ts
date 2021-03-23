import { RootState } from '../index';

export const getAllInterfaceData = (state: RootState) => state.interface;
export const interfaceGetPointerPosition = (state: RootState) => state.interface.pointer;
export const interfaceGetModalState = (id: string) => (state: RootState) => state.interface.modalIsOpen[id];