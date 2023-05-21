import css from './phonebook.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { addContacts } from 'components/redux/contacts/operations.js';
import { selectContacts } from 'components/redux/contacts/selectors.js';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https:/connections-api.herokuapp.com';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    setName('');
    setNumber('');

    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (name !== '' && number !== '') {
      const existingContact = contacts.find(contact => contact.name === name);
      if (existingContact) {
        Notify.failure(`A contact with the name '${name}' already exists.`);
        return;
      }
      dispatch(addContacts({ name, number }));
      form.reset();
      return;
    }
    // const text = form.elements.text.value;
    // if (text !== '') {
    //   dispatch(addContacts(text));
    //   form.reset();
    //   return;
    // }
    alert('Task cannot be empty. Enter some text!');
  };

  // async function createContact({ name, number }) {
  //   const response = await axios.get('contacts');
  //   async function fetchContacts() {
  //     try {
  //       const data = await response.json();
  //       console.log(data);

  //       if (data) {
  //         dispatch(fetchContacts(data));
  //         return data;
  //       }
  //     } catch (error) {
  //       console.error('Error fetching contacts:', error);
  //     }
  //   }

  //   try {
  //     const contacts = await fetchContacts();
  //     const existingContact = contacts.find(contact => contact.name === name);
  //     if (existingContact) {
  //       alert(`A contact with the name '${name}' already exists.`);
  //       return;
  //     }

  //     const response = await axios.post('contacts', { name, number });
  //     // const response = await fetch(
  //     //   'https://645edbd59d35038e2d18dbec.mockapi.io/contacts',
  //     //   {
  //     //     method: 'POST',
  //     //     headers: { 'content-type': 'application/json' },
  //     //     body: JSON.stringify({ name, number }),
  //     //   }
  //     // );

  //     if (!response.ok) {
  //       throw new Error(`Failed to create contact: ${response.statusText}`);
  //     } else {
  //       fetchContacts();
  //     }

  //     console.log('Contact created successfully');
  //   } catch (error) {
  //     console.error('Error creating contact:', error);
  //   }
  // }

  // createContact({ name, number });
  // };

  return (
    <form className={css['contact-form']} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number</label>
      <input
        id="number"
        type="tel"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
};

export default ContactForm;
