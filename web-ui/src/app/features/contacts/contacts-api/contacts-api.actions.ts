import { createAction, props } from '@ngrx/store';
import { ContactDto } from 'src/app/features/contacts/contacts-api/contacts-client';
import { makeActionName } from 'src/app/shared/make-action-name';

const actionName = makeActionName('Contacts API');

const getContactsRequested = createAction(actionName('Get contacts requested'));
const getContactsSucceeded = createAction(actionName('Get contacts succeeded'), props<{ contacts: ContactDto[] }>());

const getOneContactRequested = createAction(actionName('Get one contact requested'), props<{ id: string }>());
const getOneContactSucceeded = createAction(actionName('Get one contact succeeded'), props<{ contact: ContactDto }>());
const getOneContactFailed = createAction(actionName('Get one contact failed'));

const postContactRequested = createAction(actionName('Post contact requested'), props<{ contact: ContactDto }>());
const postContactSucceeded = createAction(actionName('Post contact succeeded'), props<{ contact: ContactDto }>());
const postContactFailed = createAction(actionName('Post contact failed'));

const putContactRequested = createAction(actionName('Put contact requested'), props<{ contact: ContactDto }>());
const putContactSucceeded = createAction(actionName('Put contact succeeded'), props<{ contact: ContactDto }>());
const putContactFailed = createAction(actionName('Put contact failed'));

const deleteContactRequested = createAction(actionName('Delete contact requested'), props<{ id: string }>());
const deleteContactSucceeded = createAction(actionName('Delete contact succeeded'), props<{ id: string }>());
const deleteContactFailed = createAction(actionName('Delete contact failed'));

export const contactsAPIActions = {
  getContactsRequested,
  getContactsSucceeded,
  getOneContactRequested,
  getOneContactSucceeded,
  getOneContactFailed,
  postContactRequested,
  postContactSucceeded,
  postContactFailed,
  putContactRequested,
  putContactSucceeded,
  putContactFailed,
  deleteContactRequested,
  deleteContactSucceeded,
  deleteContactFailed
};
