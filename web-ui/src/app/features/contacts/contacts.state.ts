import { createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ContactDto } from './contacts-api/contacts-client';

export interface ContactsState {
  contacts: ContactDto[];
  isGettingContacts: boolean;
  contact?: ContactDto;
  isGettingContact: boolean;
  isCreatingContact: boolean;
  isUpdatingContact: boolean;
  isDeletingContact: boolean;
}

export const contactsFeatureSelector = createFeatureSelector<AppState, ContactsState>('contacts');
