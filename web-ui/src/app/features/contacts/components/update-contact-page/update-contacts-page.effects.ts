import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { updateContactPageActions } from './update-contacts-page.actions';
import { contactsAPIActions } from '../../contacts-api/contacts-api.actions';

@Injectable()
export class UpdateContactPageEffects {
  constructor(private readonly _actions$: Actions) {}

  public idChanged$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(updateContactPageActions.idChanged),
      map(action => contactsAPIActions.getOneContactRequested({ id: action.id }))
    );
  });
}
