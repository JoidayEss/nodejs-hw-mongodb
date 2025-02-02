import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Name not found',
    'string.base': 'Username should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{12}$/)
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be in the format +380000000000',
    }),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().required().messages({
    'any.required': 'isFavourite is required',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.required': 'Contact type is required',
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),
  userId: Joi.objectId().optional().messages({
    'string.pattern.base': 'Parent ID must be a valid ObjectId',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional().allow(null),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
}).min(1);

export const querySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  perPage: Joi.number().integer().min(1).optional(),
  sortBy: Joi.string().valid('name').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional(),
  type: Joi.string().valid('work', 'home', 'personal').optional(),
  isFavourite: Joi.string().valid('true', 'false').optional(),
});
