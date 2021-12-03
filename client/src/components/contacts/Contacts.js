import React,{Fragment,useContext,useEffect} from 'react'
import ContactContext from'../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const {contacts,filtered,getContact} = contactContext;

    useEffect(()=>{
        getContact()
        //eslint-disable-next-line 
    },[])

    if(contacts.length === 0){
        return <h4>Please add a Contact</h4>
    }

    return (
        <Fragment>
            {filtered !== null 
            ? filtered.map(contact => (<ContactItem key={contact._id} contact={contact}/>))
            : contacts.map(contact => (<ContactItem key={contact._id} contact={contact}/>))}
        </Fragment>
    )
}

export default Contacts
