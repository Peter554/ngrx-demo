export enum NotificationType {
  Success = 0,
  Error
}

export interface AppNotification {
  text: string;
  type: NotificationType;
  read: boolean;
}
