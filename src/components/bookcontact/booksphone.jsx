import React from 'react';
import Form from 'components/FormForContact/form';
import css from './booksphone.module.css'

class BookPhones extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  FormSubmit = data => {
    const existingContact = this.state.contacts.find(
      el => el.name === data.name
    );

    if (existingContact) {
      return alert('already added');
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  deleteContact = number => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.number !== number),
    }));
  };

  handleFindContact = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <h1 className={css.title}>Phonebook</h1>
        <Form onSubmit={this.FormSubmit} />
        <div className={css.container}>
          <h2 className={css.title_contact}>Contacts</h2>

          <label className={css.find_contact} htmlFor="">
            Find contacts by name
            <input
              className={css.input_find}
              type="text"
              name="filter"
              value={this.state.filter}
              onChange={this.handleFindContact}
            />
          </label>

          <ul>
            {filteredContacts.map(contact => (
              <li className={css.list_contact} key={contact.number}>
                <p className={css.info_contact}>{contact.name}</p>
                <p className={css.info_contact}>{contact.number}</p>
                <button
                  className={css.button_delet_contact}
                  type="button"
                  onClick={() => this.deleteContact(contact.number)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default BookPhones;
