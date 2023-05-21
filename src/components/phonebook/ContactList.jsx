import { selectContacts } from 'components/redux/contacts/selectors.js';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import {
  deleteContacts,
  fetchContacts,
} from 'components/redux/contacts/operations.js';
import { getStatusFilter } from 'components/redux/selectors.js';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const ContactList = () => {
  const filter = useSelector(getStatusFilter);

  const contacts = useSelector(selectContacts);
  const shownContacts = contacts.filter(person => person.name.includes(filter));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteContacts(id));
  };
  return (
    <ul>
      {shownContacts.map(contact => {
        return (
          <li key={contact.id}>
            {contact.name} {contact.number}{' '}
            <button
              type="button"
              id={contact.id}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
  filter: PropTypes.string,
};

export default ContactList;
