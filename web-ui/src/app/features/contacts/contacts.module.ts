import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { ContactsListingComponent } from './components/contacts-listing/contacts-listing.component';
import { contactsReducer } from './contacts.reducer';
import { ContactsAPIEffects } from './contacts-api/contacts-api.effects';
import { ContactsListingEffects } from './components/contacts-listing/contacts-listing.effects';
import { CreateContactPageComponent } from './components/create-contact-page/create-contact-page.component';
import { UpdateContactPageComponent } from './components/update-contact-page/update-contact-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactEditorComponent } from './components/contact-editor/contact-editor.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { UpdateContactPageEffects } from './components/update-contact-page/update-contacts-page.effects';
import { OrderBySurnamePipe } from './pipes/order-by-surname.pipe';

const routes: Routes = [
  {
    path: '',
    component: ContactsPageComponent,
    children: [
      {
        path: 'create',
        component: CreateContactPageComponent
      },
      {
        path: ':id',
        component: UpdateContactPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ContactsPageComponent,
    ContactsListingComponent,
    CreateContactPageComponent,
    UpdateContactPageComponent,
    ContactEditorComponent,
    FullNamePipe,
    OrderBySurnamePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('contacts', contactsReducer),
    EffectsModule.forFeature([ContactsAPIEffects, ContactsListingEffects, UpdateContactPageEffects])
  ]
})
export class ContactsModule {}
