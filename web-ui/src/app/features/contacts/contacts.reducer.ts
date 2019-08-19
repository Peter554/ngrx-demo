import { createReducer, Action } from '@ngrx/store';

import { ContactsState } from './contacts.state';
import { onContactsAPIActions } from './contacts-api/on-contacts-api-actions';

const initialState: ContactsState = {
  contacts: [],
  isGettingContacts: false,
  contact: undefined,
  isGettingContact: false,
  isCreatingContact: false,
  isUpdatingContact: false,
  isDeletingContact: false
};

const reducer = createReducer<ContactsState>(initialState, ...onContactsAPIActions);

export function contactsReducer(state: ContactsState | undefined, action: Action) {
  return reducer(state, action);
}
