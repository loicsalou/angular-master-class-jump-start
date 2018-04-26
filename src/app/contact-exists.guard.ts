import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {ApplicationState} from './state/app.state';
import {Store} from '@ngrx/store';
import {AddContactAction, SelectContactsAction} from './state/contacts/contacts.actions';
import {of} from 'rxjs/observable/of';
import {ContactsService} from './contacts.service';
import {Contact} from './models/contact';
import {Injectable} from '@angular/core';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private store: Store<ApplicationState>, private contactsService: ContactsService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this.store.dispatch(new SelectContactsAction(id));
    const selectLoaded = (state: ApplicationState) => state.contacts.loaded;

    return this.store.select(selectLoaded).pipe(
      take(1),
      switchMap(loaded => {
        if (loaded) {
          return of(true);
        }

        return this.contactsService.getContact(id)
          .pipe(
            tap((contact: Contact) => this.store.dispatch(new AddContactAction(contact))),
            map(contact => !!contact)
          );
      })
    );
  }
}