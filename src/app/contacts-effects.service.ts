import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {ContactsService} from './contacts.service';
import {
  ContactsActionTypes,
  LoadContactsSuccessAction,
  UpdateContactsAction,
  UpdateContactSuccessAction
} from './state/contacts/contacts.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {Contact} from './models/contact';

@Injectable()
export class ContactsEffectsService {

  @Effect() getContacts$ = this.actions$
    .ofType(ContactsActionTypes.LoadContactsActionType).pipe(
      switchMap(() => this.contactsService.getContacts()),
      map((contacts: Array<Contact>) => new LoadContactsSuccessAction(contacts))
    );
  @Effect() updateContact$ = this.actions$
    .ofType(ContactsActionTypes.UpdateContactActionType).pipe(
      map((action: UpdateContactsAction) => action.contact),
      switchMap((contact: Contact) => this.contactsService.updateContact(contact)),
      tap((contact: Contact) => this.router.navigate(['/contact', contact.id])),
      map((contact: Contact) => new UpdateContactSuccessAction(contact))
    );

  constructor(private actions$: Actions,
              private contactsService: ContactsService,
              private router: Router) {
  }

}
