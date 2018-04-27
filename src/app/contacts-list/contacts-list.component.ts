import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../models/contact';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {LoadContactsAction} from '../state/contacts/contacts.actions';
import {ContactsQuery} from '../state/contacts/contact.reducer';
import getContacts = ContactsQuery.getContacts;

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadContactsAction());
    this.contacts$ = this.store.select(getContacts);
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
