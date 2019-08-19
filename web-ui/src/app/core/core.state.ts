import { AppNotification } from './notifications/notification';
import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export interface CoreState {
  notifications: AppNotification[];
  notificationsMenuIsOpen: boolean;
}

export const coreFeatureSelector = createFeatureSelector<AppState, CoreState>('core');
