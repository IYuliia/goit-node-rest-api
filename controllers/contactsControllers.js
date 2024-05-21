import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
    const { _id: owner} = req.user;
    const filter = {owner};
    const result = await contactsServices.listContacts({filter});

    res.json(result);
};

const getOneContact = async (req, res) => {
        const {id: _id} = req.params;
        const {_id: owner} = req.user;
        const result = await contactsServices.getContact({_id, owner});
        if(!result) {
           throw HttpError(404, "Not found");
        }
        res.json(result);
};

const deleteContact = async (req, res) => {
        const {id: _id} = req.params;
        const {_id: owner} = req.user;
    const result = await contactsServices.removeContact({_id, owner});
    if(!result) {
        throw HttpError(404, "Not found");
     }
     res.json(result);
};

const createContact = async (req, res) => {
        const { _id: owner } = req.user;
        const result = await contactsServices.addContact({...req.body, owner});
        res.status(201).json(result);
};

const updateContact = async (req, res) => {
        const {id: _id} = req.params;
        const {_id: owner} = req.user;
        const result = await contactsServices.updateContact({_id, owner}, req.body);
        if(!result) {
            throw HttpError(404, "Not found");
         }
        res.json(result);
};

const updateStatusContact = async (req, res) => {
    const {id: _id} = req.params;
    const {_id: owner} = req.user;
    const result = await contactsServices.updateStatusContact({_id, owner}, req.body);
    if(!result) {
        throw HttpError(404, "Not found");
     }
    res.json(result);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}