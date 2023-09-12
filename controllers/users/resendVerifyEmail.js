const { User } = require("../../models");
const { emailSchema } = require("../../schemas");

const sendEmail = require("../../helpers/sendEmail");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email not found",
      });
      return;
    }
    if (user.verify) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Verification has already been passed",
      });
      return;
    }

    const mail = {
      to: email,
      subject: "Please Verify Your Identity",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Verify Your Identity</a>`,
    };

    await sendEmail(mail);

    res.status(200).json({
      status: "Ok",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
