import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

import { ContactDto } from 'src/app/features/contacts/contacts-api/contacts-client';

export const makeEmptyContactDto = (): ContactDto => {
  return {
    id: '',
    forename: '',
    surname: '',
    emailAddress: ''
  };
};

@Injectable()
export class ContactForm {
  constructor(private readonly _fb: FormBuilder) {
    this.forenameControlName = 'forename';
    this.surnameControlName = 'surname';
    this.emailAddressControlName = 'emailAddress';

    this.form = this._fb.group({
      [this.forenameControlName]: ['', Validators.required],
      [this.surnameControlName]: ['', Validators.required],
      [this.emailAddressControlName]: ['', [Validators.required, Validators.email]]
    });

    this.reset();

    this.forenameControl = this.form.get(this.forenameControlName) as AbstractControl;
    this.surnameControl = this.form.get(this.surnameControlName) as AbstractControl;
    this.emailAddressControl = this.form.get(this.emailAddressControlName) as AbstractControl;
  }

  public readonly form: FormGroup;

  public readonly forenameControlName: string;
  public readonly surnameControlName: string;
  public readonly emailAddressControlName: string;

  public readonly forenameControl: AbstractControl;
  public readonly surnameControl: AbstractControl;
  public readonly emailAddressControl: AbstractControl;

  private _lastImported: ContactDto = makeEmptyContactDto();

  public import(contact?: ContactDto): void {
    contact = contact || makeEmptyContactDto();

    this.form.patchValue({
      [this.forenameControlName]: contact.forename,
      [this.surnameControlName]: contact.surname,
      [this.emailAddressControlName]: contact.emailAddress
    });

    this.form.markAsPristine();

    this._lastImported = _.cloneDeep(contact);
  }

  public export(): ContactDto {
    const formData = this.form.value;

    return {
      ...this._lastImported,
      ...formData
    };
  }

  public reset(): void {
    this.import(this._lastImported);
  }
}
