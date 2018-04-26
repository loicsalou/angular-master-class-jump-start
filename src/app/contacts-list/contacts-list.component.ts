import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {LoadContactsSuccessAction} from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private contactsService: ContactsService, private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(
      (contacts: Contact[]) => this.store.dispatch(new LoadContactsSuccessAction(contacts))
    );
    const query = (state: ApplicationState) => state.contacts.list;
    this.contacts$ = this.store.select(query);
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
