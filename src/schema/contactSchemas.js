import Joi from 'joi';

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().optional().allow(null),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
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
