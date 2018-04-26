import {Action} from '@ngrx/store';
import {Contact} from '../../models/contact';

export enum ContactsActionTypes {
  AddContactsActionType = '[contacts] - add contact',
  LoadContactsSuccessActionType = '[contacts] - load success',
  SelectContactActionType = '[contacts] - select',
  UpdateContactActionType = '[contacts] - update'
}

/** Implement LoadContactsSuccessAction here */

export type ContactsActions = AddContactAction | LoadContactsSuccessAction | SelectContactsAction | UpdateContactsAction;

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LoadContactsSuccessActionType;

  constructor(public contacts: Array<Contact>) {
  }
}

export class SelectContactsAction implements Action {
  readonly type = ContactsActionTypes.SelectContactActionType;

  constructor(public selected: string) {
  }
}

export class UpdateContactsAction implements Action {
  readonly type = ContactsActionTypes.UpdateContactActionType;

  constructor(public contact: Contact) {
  }
}

export class AddContactAction implements Action {
  readonly type = ContactsActionTypes.AddContactsActionType;

  constructor(public contact: Contact) {
  }
}
