import { createAction, props } from '@ngrx/store';
import { makeActionName } from 'src/app/shared/make-action-name';

const actionName = makeActionName('Update Contact Page Component');

const idChanged = createAction(actionName('Id changed'), props<{ id: string }>());

export const updateContactPageActions = {
  idChanged
};
