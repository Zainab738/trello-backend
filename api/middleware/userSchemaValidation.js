const yup = require("yup");
const validateUser = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  username: yup.string().required().min(3),
});
module.exports = validateUser;
