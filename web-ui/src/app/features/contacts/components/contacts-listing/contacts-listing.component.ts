import { Component, OnInit } from '@angular/core';
import { select, Store, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { contactsFeatureSelector } from '../../contacts.state';
import { Observable } from 'rxjs';
import { contactsListingActions } from './contacts-listing.actions';
import { ContactsListingComponentData } from './contacts-listing.component';
import { ContactDto } from 'src/app/features/contacts/contacts-api/contacts-client';

export interface ContactsListingComponentData {
  showSpinner: boolean;
  contacts: ContactDto[];
}

const dataSelector = createSelector(
  contactsFeatureSelector,
  (state): ContactsListingComponentData => ({
    showSpinner: state.contacts.length === 0 && state.isGettingContacts,
    contacts: state.contacts
  })
);

@Component({
  selector: 'app-contacts-listing',
  templateUrl: './contacts-listing.component.html'
})
export class ContactsListingComponent implements OnInit {
  constructor(private readonly _store: Store<AppState>) {
    this.data$ = this._store.pipe(select(dataSelector));
  }

  public readonly data$: Observable<ContactsListingComponentData>;

  public ngOnInit(): void {
    this._store.dispatch(contactsListingActions.didInit());
  }
}
