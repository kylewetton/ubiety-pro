export const ADD_INBOX_ITEM = 'ADD_INBOX_ITEM';

export interface AddInboxItemAction {
    payload: any;
    type: typeof ADD_INBOX_ITEM;
}

export type InboxActionTypes = AddInboxItemAction;