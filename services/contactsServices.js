import Contact from "../models/Contact.js"

export const listContacts = (search = {}) => {
    const {filter = {}} = search;
    return Contact.find(filter)};

export const getContact = filter => Contact.findOne(filter);

export const removeContact = filter => Contact.findOneAndDelete(filter);

export const addContact = data => Contact.create(data);

export const updateContact = (filter, data) => Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = async (filter, data) => {
    const { favorite } = data;
    const updatedContact = await Contact.findOneAndUpdate(filter, { favorite }, { new: true });

    if (!updatedContact) {
        return null;
    }

    return updatedContact;
};