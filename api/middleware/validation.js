const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, {
      abortEarly: false,
      context: { file: req.file },
    });
    next();
  } catch (error) {
    res.status(400).json({ message: "errors", error: error });
  }
};

module.exports = validation;
