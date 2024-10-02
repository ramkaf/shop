import Joi from 'joi'
const usersRegisterSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'))
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
      'any.required': 'Password is required'
    }),
  confirm_password: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Confirm password is required'
    }),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  mobile: Joi.string()
    .pattern(/^09[0-9]{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid Iranian mobile number format.'
    })
});


const usersLoginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
})

const usersUpdateSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional()
})

const userUpdatePasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      'string.min': 'Password must be at least 8 characters long.',
      'any.required': 'Password is required.'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'confirm password must match the password.',
    'any.required': 'confirm password is required.'
  })
})

export { usersRegisterSchema, usersLoginSchema, usersUpdateSchema, userUpdatePasswordSchema }
