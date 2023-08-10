const data = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await data.removeContact(contactId);
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
