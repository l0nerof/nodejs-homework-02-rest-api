const { Contact } = require("../../models");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      res.status(404).send("Not found");
      return;
    }
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
