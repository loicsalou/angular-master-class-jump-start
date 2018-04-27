import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {ApplicationState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {SelectContactsAction, UpdateContactsAction} from '../state/contacts/contacts.actions';
import {Observable} from 'rxjs/Observable';
import {ContactsQuery} from '../state/contacts/contact.reducer';
import {map} from "rxjs/operators";
import getSelectedContact = ContactsQuery.getSelectedContact;

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  // we need to initialize since we can't use ?. operator with ngModel
  contact$: Observable<Contact>;

  constructor(private router: Router,
              private route: ActivatedRoute, private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    const selectedContactId = this.route.snapshot.paramMap.get('id');

    this.contact$ = this.store.select(getSelectedContact).pipe(
      map(
        contact => {
          return {...contact};
        }
      ));
    this.store.dispatch(new SelectContactsAction(selectedContactId));
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.store.dispatch(new UpdateContactsAction(contact));

    // on suppose que l'update est OK ?
    this.goToDetails(contact);
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}

