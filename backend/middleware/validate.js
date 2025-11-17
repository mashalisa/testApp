const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body, { abortEarly: false });
      req.validatedBody = value; 
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.details.map((detail) => detail.message),
      });
    }
  };
};
const validateParams = (schema) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.params, { abortEarly: false });
      req.validatedParams = value;
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.details.map((detail) => detail.message),
      });
    }
  };
};
const validateQuery = (schema) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.query, { abortEarly: false });
      req.validatedQuery = value;
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.details.map((detail) => detail.message),
      });
    }
  };
};
module.exports = {validate, validateParams, validateQuery};