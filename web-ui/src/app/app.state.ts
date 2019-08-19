import { ContactsState } from './features/contacts/contacts.state';
import { CoreState } from './core/core.state';

export interface AppState {
  core: CoreState;
  contacts: ContactsState;
}
