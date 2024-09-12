import Joi from 'joi'
const usersRegisterSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required()
})
const usersLoginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
})

const  usersUpdateSchema = Joi.object({
  firstName : Joi.string().optional(),
  lastName : Joi.string().optional()
})

const userUpdatePasswordSchema = Joi.object({
  password :Joi.string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    'string.min': 'Password must be at least 8 characters long.',
    'any.required': 'Password is required.'
  }),
  confirmPassword: Joi.string()
  .valid(Joi.ref('password'))
  .required()
  .messages({
    'any.only': 'confirm password must match the password.',
    'any.required': 'confirm password is required.'
  })
})

export { usersRegisterSchema, usersLoginSchema , usersUpdateSchema , userUpdatePasswordSchema}
