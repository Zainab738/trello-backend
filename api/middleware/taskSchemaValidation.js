const yup = require("yup");
const validateTask = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
  deadline: yup.string().required(),
});
module.exports = validateTask;

// title: String,
//   description: String,
//   status: String,
//   deadline: String,
