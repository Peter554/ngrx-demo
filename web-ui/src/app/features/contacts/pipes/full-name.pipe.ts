import { Pipe, PipeTransform } from '@angular/core';
import { ContactDto } from 'src/app/features/contacts/contacts-api/contacts-client';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(value: ContactDto): any {
    return `${value.forename} ${value.surname}`;
  }
}
