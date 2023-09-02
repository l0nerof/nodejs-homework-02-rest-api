const { Contact } = require("../../models");
const { contactSchema } = require("../../schemas");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).send("missing fields");
      return;
    }
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!updatedContact) {
      res.status(404).send("Not Found");
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
