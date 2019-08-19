import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ContactsClient } from 'src/app/features/contacts/contacts-api/contacts-client';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { contactsAPIActions } from './contacts-api.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { notificationActions } from 'src/app/core/notifications/notifications.actions';
import { NotificationType } from 'src/app/core/notifications/notification';

@Injectable()
export class ContactsAPIEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _contactsClient: ContactsClient,
    private readonly _router: Router
  ) {}

  public getContactsRequested$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.getContactsRequested),
      switchMap(() => {
        return this._contactsClient
          .getAll()
          .pipe(map(contacts => contactsAPIActions.getContactsSucceeded({ contacts })));
      })
    );
  });

  public getOneContactRequested$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.getOneContactRequested),
      switchMap(action => {
        return this._contactsClient.getOne(action.id).pipe(
          map(contact => {
            return contactsAPIActions.getOneContactSucceeded({ contact });
          }),
          catchError(() => {
            return of(contactsAPIActions.getOneContactFailed());
          })
        );
      })
    );
  });

  public getOneContactFailed$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(contactsAPIActions.getOneContactFailed),
        tap(() => this._router.navigate(['/contacts']))
      );
    },
    { dispatch: false }
  );

  public postContactRequested$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.postContactRequested),
      switchMap(action => {
        return this._contactsClient.post(action.contact).pipe(
          map(contact => {
            return contactsAPIActions.postContactSucceeded({ contact });
          }),
          catchError(() => {
            return of(contactsAPIActions.postContactFailed());
          })
        );
      })
    );
  });

  public postContactSucceeded$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.postContactSucceeded),
      tap(() => this._router.navigate(['/contacts'])),
      switchMap(action => [
        contactsAPIActions.getContactsRequested(),
        notificationActions.addNotification({
          notification: {
            text: `Successfully created contact ${action.contact.forename} ${action.contact.surname}.`,
            type: NotificationType.Success,
            read: false
          }
        })
      ])
    );
  });

  public postContactFailed$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.postContactFailed),
      switchMap(action => [
        contactsAPIActions.getContactsRequested(),
        notificationActions.addNotification({
          notification: {
            text: `Failed to create contact.`,
            type: NotificationType.Error,
            read: false
          }
        })
      ])
    );
  });

  public putContactRequested$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.putContactRequested),
      switchMap(action => {
        return this._contactsClient.put(action.contact).pipe(
          map(contact => contactsAPIActions.putContactSucceeded({ contact })),
          catchError(() => {
            return of(contactsAPIActions.putContactFailed());
          })
        );
      })
    );
  });

  public putContactSucceeded$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.putContactSucceeded),
      switchMap(({ contact }) => [
        contactsAPIActions.getContactsRequested(),
        notificationActions.addNotification({
          notification: {
            text: `Successfully updated contact ${contact.forename} ${contact.surname}.`,
            type: NotificationType.Success,
            read: false
          }
        })
      ])
    );
  });

  public putContactFailed$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.putContactFailed),
      map(() =>
        notificationActions.addNotification({
          notification: {
            text: 'Failed to update contact.',
            type: NotificationType.Error,
            read: false
          }
        })
      )
    );
  });

  public deleteContactRequested$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.deleteContactRequested),
      switchMap(({ id }) => {
        return this._contactsClient.delete(id).pipe(
          map(() => {
            return contactsAPIActions.deleteContactSucceeded({ id });
          }),
          catchError(() => {
            return of(contactsAPIActions.deleteContactFailed());
          })
        );
      })
    );
  });

  public deleteContactSucceeded$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.deleteContactSucceeded),
      tap(() => this._router.navigate(['/contacts'])),
      map(() =>
        notificationActions.addNotification({
          notification: {
            text: 'Successfully deleted contact.',
            type: NotificationType.Success,
            read: false
          }
        })
      )
    );
  });

  public deleteContactFailed$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsAPIActions.deleteContactFailed),
      map(() =>
        notificationActions.addNotification({
          notification: {
            text: 'Failed to delete contact.',
            type: NotificationType.Error,
            read: false
          }
        })
      )
    );
  });
}
