import { Component } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { AppNotification, NotificationType } from '../notification';
import { coreFeatureSelector } from '../../core.state';

interface NotificationsComponentData {
  notifications: AppNotification[];
  menuIsOpen: boolean;
}

const dataSelector = createSelector(
  coreFeatureSelector,
  (state): NotificationsComponentData => ({
    notifications: state.notifications,
    menuIsOpen: state.notificationsMenuIsOpen
  })
);

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  constructor(private readonly _store: Store<AppState>) {
    this.data$ = this._store.select(dataSelector);
  }

  public readonly data$: Observable<NotificationsComponentData>;

  public getNotificationClass(notification: AppNotification): string {
    switch (notification.type) {
      case NotificationType.Success:
        return 'alert alert-primary';

      case NotificationType.Error:
        return 'alert alert-danger';

      default:
        return 'alert';
    }
  }
}
