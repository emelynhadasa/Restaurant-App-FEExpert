// filter.js
import _ from 'lodash';

const filterContacts = (contacts, contactType) => _.filter(contacts, contactType === 'all' ? {} : { type: contactType });

export default filterContacts;
