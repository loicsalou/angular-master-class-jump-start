import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';

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
        list: action.contacts
      };
    }

    case ContactsActionTypes.SelectContactActionType: {
      return {
        ...state,
        selected: action.selected
      };
    }

    case ContactsActionTypes.UpdateContactActionType: {
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

