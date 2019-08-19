import { Pipe, PipeTransform } from '@angular/core';
import { ContactDto } from '../contacts-api/contacts-client';

@Pipe({
  name: 'orderBySurname'
})
export class OrderBySurnamePipe implements PipeTransform {
  transform(value: ContactDto[]): any {
    const clone = [...value];
    return clone.sort((a, b) => (a.surname.toLowerCase() < b.surname.toLowerCase() ? -1 : +1));
  }
}
