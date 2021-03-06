import Joi from 'joi';

const validateAccount = (req, res, next) => {
  const schema = {
    type: Joi.string().alphanum({ minDomainSegments: 2 }).required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: 'type should be current or savings',
    });
  }
  next();
};

export default validateAccount;
