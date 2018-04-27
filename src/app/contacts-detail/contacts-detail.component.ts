import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Contact} from '../models/contact';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {Observable} from 'rxjs/Observable';
import {SelectContactsAction} from '../state/contacts/contacts.actions';
import {ContactsQuery} from '../state/contacts/contact.reducer';
import getSelectedContact = ContactsQuery.getSelectedContact;

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  // contact: Contact;
  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute, private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    const selectedContactId = this.route.snapshot.paramMap.get('id');
    const contactsSelector = (state: ApplicationState) => state.contacts;
    this.store.dispatch(new SelectContactsAction(selectedContactId));

    this.contact$ = this.store.select(getSelectedContact);
  }
}
