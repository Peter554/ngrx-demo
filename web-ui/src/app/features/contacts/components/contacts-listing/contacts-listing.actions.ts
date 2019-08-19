import { createAction } from '@ngrx/store';
import { makeActionName } from 'src/app/shared/make-action-name';

const actionName = makeActionName('Contacts Listing Component');

const didInit = createAction(actionName('Did init'));

export const contactsListingActions = {
  didInit
};
