import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { notificationActions } from './notifications.actions';
import { map, debounceTime } from 'rxjs/operators';

@Injectable()
export class NotificationsEffects {
  constructor(private readonly _actions$: Actions) {}

  added$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(notificationActions.addNotification),
      map(() => notificationActions.openNotificationMenu())
    );
  });

  opened$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(notificationActions.openNotificationMenu),
      debounceTime(5000),
      map(() => notificationActions.closeNotificationMenu())
    );
  });
}
