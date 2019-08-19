import { Pipe, PipeTransform } from '@angular/core';
import { AppNotification } from './notification';

@Pipe({
  name: 'unread'
})
export class UnreadPipe implements PipeTransform {
  transform(value: AppNotification[]): any {
    return value.filter(o => !o.read);
  }
}
