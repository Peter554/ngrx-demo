import { on } from '@ngrx/store';
import produce from 'immer';

import { contactsAPIActions } from './contacts-api.actions';
import { ContactsState } from '../contacts.state';

const onGetContactsRequested = on(contactsAPIActions.getContactsRequested, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isGettingContacts = true;
  });
});

const onGetContactsSucceeded = on(contactsAPIActions.getContactsSucceeded, (state: ContactsState, { contacts }) => {
  return produce(state, draft => {
    draft.contacts = contacts;
    draft.isGettingContacts = false;
  });
});

const onGetOneContactRequested = on(contactsAPIActions.getOneContactRequested, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isGettingContact = true;
  });
});

const onGetOneContactSucceeded = on(contactsAPIActions.getOneContactSucceeded, (state: ContactsState, { contact }) => {
  return produce(state, draft => {
    draft.contact = contact;
    draft.isGettingContact = false;
  });
});

const onGetOneContactFailed = on(contactsAPIActions.getOneContactFailed, (state: ContactsState) => {
  return produce(state, draft => {
    draft.contact = undefined;
    draft.isGettingContact = false;
  });
});

const onPostContactRequested = on(contactsAPIActions.postContactRequested, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isCreatingContact = true;
  });
});

const onPostContactSucceeded = on(contactsAPIActions.postContactSucceeded, (state: ContactsState, { contact }) => {
  return produce(state, draft => {
    draft.isCreatingContact = false;
  });
});

const onPostContactFailed = on(contactsAPIActions.postContactFailed, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isCreatingContact = false;
  });
});

const onPutContactRequested = on(contactsAPIActions.putContactRequested, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isUpdatingContact = true;
  });
});

const onPutContactSucceeded = on(contactsAPIActions.putContactSucceeded, (state: ContactsState, { contact }) => {
  return produce(state, draft => {
    draft.isUpdatingContact = false;

    if (draft.contact && draft.contact.id === contact.id) {
      draft.contact = contact;
    }
  });
});

const onPutContactFailed = on(contactsAPIActions.putContactFailed, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isUpdatingContact = false;
  });
});

const onDeleteContactRequested = on(contactsAPIActions.deleteContactRequested, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isDeletingContact = true;
  });
});

const onDeleteContactSucceeded = on(contactsAPIActions.deleteContactSucceeded, (state: ContactsState, { id }) => {
  return produce(state, draft => {
    draft.isDeletingContact = false;
    draft.contacts = draft.contacts.filter(o => o.id !== id);
  });
});

const onDeleteContactFailed = on(contactsAPIActions.deleteContactFailed, (state: ContactsState) => {
  return produce(state, draft => {
    draft.isDeletingContact = false;
  });
});

export const onContactsAPIActions = [
  onGetContactsRequested,
  onGetContactsSucceeded,
  onGetOneContactRequested,
  onGetOneContactSucceeded,
  onGetOneContactFailed,
  onPostContactRequested,
  onPostContactSucceeded,
  onPostContactFailed,
  onPutContactRequested,
  onPutContactSucceeded,
  onPutContactFailed,
  onDeleteContactRequested,
  onDeleteContactSucceeded,
  onDeleteContactFailed
];
