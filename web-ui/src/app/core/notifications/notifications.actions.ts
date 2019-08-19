import { makeActionName } from 'src/app/shared/make-action-name';
import { createAction, props } from '@ngrx/store';
import { AppNotification } from './notification';

const actionName = makeActionName('Notifications');

const addNotification = createAction(actionName('Add notification'), props<{ notification: AppNotification }>());
const openNotificationMenu = createAction(actionName('Open menu'));
const closeNotificationMenu = createAction(actionName('Close menu'));

export const notificationActions = {
  addNotification,
  openNotificationMenu,
  closeNotificationMenu
};
