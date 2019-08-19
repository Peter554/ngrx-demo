import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import * as uuid from 'uuid/v1';

const DELAY = 500;

export interface ContactDto {
  id: string;
  forename: string;
  surname: string;
  emailAddress: string;
}

const initialData = [
  {
    id: 'e3af2fd0-bdff-11e9-b976-fd30876c7728',
    forename: 'Ben',
    surname: 'Smith',
    emailAddress: 'ben.smith@hotmail.com'
  },
  {
    id: 'f4ca4e81-bdff-11e9-bf13-edac639e2202',
    forename: 'Amy',
    surname: 'Blogs',
    emailAddress: 'amyblogs@gmail.com'
  }
].map(o => [o.id, o]) as [string, ContactDto][];

@Injectable({
  providedIn: 'root'
})
export class ContactsClient {
  private readonly _contacts = new Map<string, ContactDto>(initialData);

  public getAll(): Observable<ContactDto[]> {
    return of(Array.from(this._contacts.values())).pipe(delay(DELAY));
  }

  public getOne(id: string): Observable<ContactDto> {
    const contact = this._contacts.get(id) as ContactDto;

    return of(contact).pipe(
      delay(DELAY),
      tap(o => {
        if (this._willError(o)) {
          throw new Error();
        }
      })
    );
  }

  public post(contact: ContactDto): Observable<ContactDto> {
    const id = uuid();

    if (!this._willError(contact)) {
      this._contacts.set(id, { ...contact, id });
    }

    return of(this._contacts.get(id) as ContactDto).pipe(
      delay(DELAY),
      tap(o => {
        if (this._willError(contact)) {
          throw new Error();
        }
      })
    );
  }

  public put(contact: ContactDto): Observable<ContactDto> {
    if (!this._willError(contact) && this._contacts.has(contact.id)) {
      this._contacts.set(contact.id, contact);
    }

    return of(this._contacts.get(contact.id) as ContactDto).pipe(
      delay(DELAY),
      tap(o => {
        if (this._willError(contact)) {
          throw new Error();
        }
      })
    );
  }

  public delete(id: string): Observable<string> {
    this._contacts.delete(id);
    return of(id).pipe(delay(DELAY));
  }

  private _willError(contact: ContactDto): boolean {
    if (!contact) {
      return true;
    }

    if (contact.forename.toLowerCase().trim() === 'error') {
      return true;
    }

    return false;
  }
}
