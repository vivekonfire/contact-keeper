import React ,{useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts:[
            {
                id: 1,
                name: "taha kommi",
                email: "taha@gamil.com",
                phone: "1111222222",
                type: 'personal'
            },
            {
                type: "personal",
                id: 2,
                name: "soumik kommi",
                email: "soumik@gamil.com",
                phone: "1111111111",
            },
            {
                type: "professional",
                id: 3,
                name: "pavan kommi",
                email: "pavan@gamil.com",
                phone: "1234567890",
            }
        ],
        current: null,
        filtered:null
    }

    const [state,dispatch] = useReducer(contactReducer,initialState);

    //Add Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({type:ADD_CONTACT, payload:contact});
    }

    const deleteContact = id => {
        dispatch({type:DELETE_CONTACT, payload:id});
    }

    const setCurrent = contact => {
        dispatch({type:SET_CURRENT, payload:contact});
    }

    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT});
    }

    const updateContact = contact =>{
        dispatch({type:UPDATE_CONTACT , payload :contact})
    }

    const filterContacts = text =>{
        dispatch({type:FILTER_CONTACTS , payload :text})
    } 

    const clearFilter = () =>{
        dispatch({type:CLEAR_FILTER })
    } 

     return(
         <ContactContext.Provider
         value={{
            contacts:state.contacts,
            current:state.current,
            filtered:state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
         }}>
             {props.children}
         </ContactContext.Provider>
     )
}

export default ContactState;