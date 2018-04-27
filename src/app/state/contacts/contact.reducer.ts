import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';
import {ApplicationState} from '../app.state';
import {createSelector} from '@ngrx/store';

export namespace ContactsQuery {
  export const getContacts = (state: ApplicationState) => state.contacts.list;
  export const getSelectedContactId = (state: ApplicationState) => state.contacts.selected;
  export const getLoaded = (state: ApplicationState) => state.contacts.loaded;
  export const getSelectedContact = createSelector(getContacts, getSelectedContactId, (contacts, id) => {
    return contacts.find((contact: Contact) => +contact.id === +id);
  });
}

export interface ContactsState {
  list: Array<Contact>;
  loaded: boolean;
  selected: string;
}

const INITIAL_STATE: ContactsState = {
  list: [],
  loaded: false,
  selected: undefined
}

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {
  switch (action.type) {

    case ContactsActionTypes.AddContactsActionType: {
      const foundContact = state.list.find(aContact => aContact.id === action.contact.id);
      return foundContact ? state : {
        ...state,
        list: [
          ...state.list,
          action.contact
        ]
      };
    }

    case ContactsActionTypes.LoadContactsSuccessActionType: {
      return {
        ...state,
        list: action.contacts,
        loaded: true
      };
    }

    case ContactsActionTypes.SelectContactActionType: {
      return {
        ...state,
        selected: action.selected
      };
    }

    case ContactsActionTypes.UpdateContactSuccessActionType: {
      return {
        ...state,
        list: state.list.map((item: Contact) => {
          if (item.id === action.contact.id) {
            return action.contact;
          } else {
            return item;
          }
        })
      };
    }

    default:
      return state;
  }
}

