const data = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await data.getContactById(contactId);
    if (!contact) {
      res.status(404).send("Not found");
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
