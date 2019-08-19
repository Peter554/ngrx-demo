import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { UnreadPipe } from './notifications/unread.pipe';
import { SharedModule } from '../shared/shared.module';
import coreReducer from './core.reducer';
import { NotificationsEffects } from './notifications/notifications.effects';

@NgModule({
  declarations: [NotificationsComponent, UnreadPipe],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('core', coreReducer),
    EffectsModule.forFeature([NotificationsEffects])
  ],
  exports: [NotificationsComponent]
})
export class CoreModule {}
