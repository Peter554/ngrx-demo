import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ContactForm } from '../../forms/contact-form';
import { ContactDto } from 'src/app/features/contacts/contacts-api/contacts-client';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  providers: [ContactForm]
})
export class ContactEditorComponent {
  constructor(public readonly fm: ContactForm) {}

  private _initialData?: ContactDto;

  public get initialData(): ContactDto | undefined {
    return this._initialData;
  }

  @Input()
  public set initialData(value: ContactDto | undefined) {
    this._initialData = value;

    this.fm.import(value);
  }

  @Output()
  public submitted = new EventEmitter<ContactDto>();

  @Output()
  public delete = new EventEmitter<string>();

  public handleSubmitClicked(): void {
    const contact = this.fm.export();
    this.submitted.next(contact);
  }

  public handleClickOnDelete(): void {
    const id = this.fm.export().id;
    this.delete.next(id);
  }
}
