import {
    ADD_INBOX_ITEM,
    AddInboxItemAction,
    InboxActionTypes
} from './types';

const initialState = {
    inbox: []
}

export function mailReducer (state = initialState, action: InboxActionTypes) {
    switch(action.type) {
        
        case ADD_INBOX_ITEM:
            return {
                ...state,
                inbox: [...state.inbox, action.payload]
            }
        default:
        return state;
    }
}