import { createReducer, Action, on } from '@ngrx/store';
import produce from 'immer';
import { CoreState } from './core.state';
import { notificationActions } from './notifications/notifications.actions';

const initialState: CoreState = {
  notifications: [],
  notificationsMenuIsOpen: false
};

const coreReducer = createReducer<CoreState>(
  initialState,
  on(notificationActions.addNotification, (state, { notification }) => {
    return produce(state, draft => {
      draft.notifications.push(notification);
    });
  }),
  on(notificationActions.openNotificationMenu, state => {
    return produce(state, draft => {
      draft.notificationsMenuIsOpen = true;
    });
  }),
  on(notificationActions.closeNotificationMenu, state => {
    return produce(state, draft => {
      draft.notifications = draft.notifications.map(o => ({ ...o, read: true }));
      draft.notificationsMenuIsOpen = false;
    });
  })
);

export default function reducer(state: CoreState | undefined, action: Action) {
  return coreReducer(state, action);
}
