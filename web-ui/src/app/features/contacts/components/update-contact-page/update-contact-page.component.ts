import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, filter, takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { updateContactPageActions } from './update-contacts-page.actions';
import { ContactDto } from '../../contacts-api/contacts-client';
import { contactsFeatureSelector } from '../../contacts.state';
import { contactsAPIActions } from '../../contacts-api/contacts-api.actions';

export interface UpdateContactPageComponentData {
  showSpinner: boolean;
  contact?: ContactDto;
}

const dataSelector = createSelector(
  contactsFeatureSelector,
  (state): UpdateContactPageComponentData => ({
    showSpinner: state.isGettingContact || state.isUpdatingContact || state.isDeletingContact,
    contact: state.contact
  })
);

@Component({
  selector: 'app-update-contact-page',
  templateUrl: './update-contact-page.component.html'
})
export class UpdateContactPageComponent implements OnInit, OnDestroy {
  constructor(private readonly _store: Store<AppState>, private readonly _route: ActivatedRoute) {
    this.data$ = this._store.select(dataSelector);
  }

  public readonly data$: Observable<UpdateContactPageComponentData>;

  private readonly _destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this._handleRouteChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public handleEditorSubmitted(contact: ContactDto): void {
    this._store.dispatch(contactsAPIActions.putContactRequested({ contact }));
  }

  public handleEditorDeleteClicked(id: string): void {
    this._store.dispatch(contactsAPIActions.deleteContactRequested({ id }));
  }

  private _handleRouteChanges(): void {
    const id$ = this._route.paramMap.pipe(
      takeUntil(this._destroy$),
      map(o => o.get('id') || ''),
      filter(o => o.length > 0),
      distinctUntilChanged()
    );

    id$
      .pipe(
        tap(id => {
          this._store.dispatch(updateContactPageActions.idChanged({ id }));
        })
      )
      .subscribe();
  }
}
