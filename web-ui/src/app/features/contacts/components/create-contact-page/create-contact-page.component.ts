import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { contactsFeatureSelector } from '../../contacts.state';
import { ContactDto } from '../../contacts-api/contacts-client';
import { contactsAPIActions } from '../../contacts-api/contacts-api.actions';

interface CreateContactPageComponentData {
  showSpinner: boolean;
}

const dataSelector = createSelector(
  contactsFeatureSelector,
  (state): CreateContactPageComponentData => ({
    showSpinner: state.isCreatingContact
  })
);

@Component({
  selector: 'app-create-contact-page',
  templateUrl: './create-contact-page.component.html'
})
export class CreateContactPageComponent {
  constructor(private readonly _store: Store<AppState>) {
    this.data$ = this._store.select(dataSelector);
  }

  public readonly data$: Observable<CreateContactPageComponentData>;

  public handleEditorSubmitted(contact: ContactDto): void {
    this._store.dispatch(contactsAPIActions.postContactRequested({ contact }));
  }
}
