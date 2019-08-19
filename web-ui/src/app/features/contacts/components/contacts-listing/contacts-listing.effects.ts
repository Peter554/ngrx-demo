import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { contactsListingActions } from './contacts-listing.actions';
import { map } from 'rxjs/operators';
import { contactsAPIActions } from '../../contacts-api/contacts-api.actions';

@Injectable()
export class ContactsListingEffects {
  constructor(private readonly _actions$: Actions) {}

  public didInit$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(contactsListingActions.didInit),
      map(() => {
        return contactsAPIActions.getContactsRequested();
      })
    );
  });
}
