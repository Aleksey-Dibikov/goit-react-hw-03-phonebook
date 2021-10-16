import React, { Component } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ContactsForm from './Components/ContactsForm/ContactsForm';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = event => {
    const searchSameName = this.state.contacts
      .map(contact => contact.name)
      .includes(event.name);

    if (searchSameName) {
      alert(`${event.name} is already in contacts`);
    } else if (event.name.length === 0) {
      alert('Fields must be filled!');
    } else {
      const contact = {
        ...event,
        id: uuidv4(),
      };

      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactsForm onAddContact={this.addContact} />

        <h2>Contacts</h2>

        {visibleContacts.length >= 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
