import {contactsReducer, ContactsState} from './contacts/contact.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface ApplicationState {
  contacts: ContactsState;
}

export const INITIAL_STATE = {
  contacts: {
    list: []
  }
};

export const ROOT_REDUCERS: ActionReducerMap<ApplicationState> = {
  contacts: contactsReducer
};
