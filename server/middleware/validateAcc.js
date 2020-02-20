import Joi from 'joi';

const validateAccount = (req, res, next) => {
  const schema = {
    date: Joi.date().required(),
    type: Joi.string().alphanum({ minDomainSegments: 2 }).required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: 'Date is incorrect',
    });
  }
  next();
};

export default validateAccount;
